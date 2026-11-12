import re


PATTERNS = [
    (
        "SQL string concatenation",
        "high",
        re.compile(r"(select|insert|update|delete).*(\+|\.format\(|f[\"'])", re.I),
        "Build SQL with parameters or an ORM instead of concatenating user input.",
    ),
    (
        "Dynamic code execution",
        "high",
        re.compile(r"\b(eval|exec)\s*\(", re.I),
        "Remove dynamic execution and use a constrained parser or explicit dispatch.",
    ),
    (
        "Shell command injection risk",
        "high",
        re.compile(r"subprocess\.[A-Za-z_]+\s*\([^)]*shell\s*=\s*True", re.I),
        "Use an argument list with shell=False and validate inputs.",
    ),
    (
        "Hardcoded secret",
        "high",
        re.compile(r"\b(api[_-]?key|secret|password|token)\b\s*[:=]\s*[\"'][^\"']{4,}", re.I),
        "Read secrets from environment or a secret manager, never from source.",
    ),
]


def scan_code(code):
    vulnerabilities = []
    for line_number, line in enumerate(code.splitlines(), start=1):
        for title, severity, pattern, recommendation in PATTERNS:
            if pattern.search(line):
                vulnerabilities.append(
                    {
                        "title": title,
                        "severity": severity,
                        "line": line_number,
                        "description": f"Potential {title.lower()} detected on this line.",
                        "recommendation": recommendation,
                    }
                )
    return vulnerabilities
