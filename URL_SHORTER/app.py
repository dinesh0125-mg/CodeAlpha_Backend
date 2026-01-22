from flask import Flask, request, redirect, render_template
import sqlite3
import string
import random

app = Flask(__name__)

# -------------------- DATABASE --------------------

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Create table if not exists
with get_db_connection() as conn:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_url TEXT NOT NULL,
            short_code TEXT UNIQUE NOT NULL
        )
    """)
    conn.commit()

# -------------------- SHORT CODE --------------------

def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def generate_unique_code():
    while True:
        code = generate_short_code()
        conn = get_db_connection()
        exists = conn.execute(
            "SELECT 1 FROM urls WHERE short_code = ?",
            (code,)
        ).fetchone()
        conn.close()
        if not exists:
            return code

# -------------------- ROUTES --------------------

@app.route('/', methods=['GET', 'POST'])
def index():
    short_url = None

    if request.method == 'POST':
        original_url = request.form['url'].strip()

        # Add http:// if missing
        if not original_url.startswith(('http://', 'https://')):
            original_url = 'http://' + original_url

        short_code = generate_unique_code()

        conn = get_db_connection()
        conn.execute(
            "INSERT INTO urls (original_url, short_code) VALUES (?, ?)",
            (original_url, short_code)
        )
        conn.commit()
        conn.close()

        # Generate full short URL
        short_url = request.host_url + short_code

    return render_template('index.html', short_url=short_url)

@app.route('/<short_code>')
def redirect_url(short_code):
    conn = get_db_connection()
    url_data = conn.execute(
        "SELECT original_url FROM urls WHERE short_code = ?",
        (short_code,)
    ).fetchone()
    conn.close()

    if url_data:
        return redirect(url_data['original_url'])
    else:
        return "URL not found", 404

# -------------------- RUN --------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
