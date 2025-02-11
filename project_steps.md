To add current user in all nav bar of base.html
https://stackoverflow.com/questions/24922831/flask-display-user-register-or-already-login-in-every-template-of-each-module

### pip install Flask-Migrate
- add extra column 
flask db migrate -m "Add is_admin column to User table"
https://flask-migrate.readthedocs.io/en/latest/

=========================================================

### Environment setups
- install python=3.8
- conda create -n test_env python=3.10 or 
- conda create --name my_env python=3.10    krenv

- Activation
   - conda activate test_env
   - conda deactivate
- pip install -r requirments.txt
https://stackoverflow.com/questions/48174935/conda-creating-a-virtual-environment

=======================================================================
``` (conda code )
- Check if Conda is installed
- conda -V
- Check if Conda is up to date
- conda update conda
- Create a virtual environment
- conda create -n yourenvname python=x.x anaconda
- Activate your virtual environment
- source activate yourenvname
- Install additional Python packages to a virtual environment
- conda install -n yourenvname [package]
- Deactivate your virtual environment
- source deactivate
- Delete the virtual environment
- conda remove -n yourenvname --all
```
===========================================================
Conda: Creating a virtual environment
   - pip install requeriments.txt
   - pip install -r requeriments.txt
   - pip install python-dotenv
   - pip install google-generativeai
   - pip3 freeze > requirements.txt
Sure, here are the steps to resolve the "No such command 'db'" error in Flask-Migrate:

1. **Install Flask-Migrate**: Ensure Flask-Migrate is installed in your Flask environment. You can install it using pip:
   
   ```
   pip install Flask-Migrate
   ```

2. **Setup Flask CLI**: Make sure you have set up the Flask CLI properly in your application. Create an instance of the Flask application and add the `flask` command to your application script:

   ```python
   from flask import Flask
   from flask_migrate import Migrate
   from flask_sqlalchemy import SQLAlchemy
   
   app = Flask(__name__)
   
   # Add configuration for SQLAlchemy
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
   
   # Initialize SQLAlchemy and Migrate
   db = SQLAlchemy(app)
   migrate = Migrate(app, db)
   
   # Define your models here
   
   # Add Flask CLI commands
   from flask.cli import FlaskGroup
   
   cli = FlaskGroup(app)
   
   if __name__ == '__main__':
       cli()
   ```

3. **Register Flask CLI Commands**: Register the `db` command with Flask CLI. This is typically done in the `manage.py` or `app.py` file of your Flask application:

   ```python
   # manage.py or app.py
   
   from your_application import app, db
   
   # Add Flask CLI commands for database migration
   @app.cli.command()
   def db():
       """Database migration commands."""
       pass
   ```

4. **Run Migration Command**: Now you can run the migration command to generate migration scripts and apply them to your database:

   ```
   flask db init  # Only if you haven't initialized migrations before
   flask db migrate -m "Add is_admin column to User table"
   flask db upgrade
   ```

These steps should resolve the "No such command 'db'" error and allow you to use Flask-Migrate successfully in your Flask application.

==========================================================================