use std::path::{Path, PathBuf};

const ALLOWED_PREFIXES: &[&str] = &[
    "/home",
    "/tmp",
    "/var/lib/docker",
    "/opt",
];

pub fn canonicalize(base_dir: &Path, user_path: &str) -> Result<PathBuf, String> {
    let p = Path::new(user_path);
    let canonical = p
        .canonicalize()
        .map_err(|_| format!("Invalid or non-existent path: {}", user_path))?;

    let valid = ALLOWED_PREFIXES
        .iter()
        .any(|prefix| canonical.starts_with(prefix));
    if !valid {
        return Err(format!(
            "Path {} is outside allowed directories",
            user_path
        ));
    }

    if p.is_symlink() {
        let target = p
            .read_link()
            .map_err(|_| "Cannot read symlink".to_string())?;
        if !target.is_absolute() {
            let abs = base_dir
                .join(&target)
                .canonicalize()
                .map_err(|_| "Symlink escape".to_string())?;
            if !ALLOWED_PREFIXES.iter().any(|p| abs.starts_with(p)) {
                return Err("Symlink escape detected".to_string());
            }
        }
    }

    Ok(canonical)
}

pub fn validate_remote_path(user_path: &str) -> Result<String, String> {
    if user_path.contains("..") {
        return Err("Path traversal detected".to_string());
    }
    if user_path.contains('\'') || user_path.contains('"') || user_path.contains('`') {
        return Err("Invalid characters in path".to_string());
    }
    if user_path.len() > 4096 {
        return Err("Path too long".to_string());
    }
    Ok(user_path.to_string())
}
