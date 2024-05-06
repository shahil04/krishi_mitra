# manage.py or app.py

from app import app, db

# Add Flask CLI commands for database migration
@app.cli.command()
def db():
    """Database migration commands."""
    pass
