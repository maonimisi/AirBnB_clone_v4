#!/usr/bin/python3
"""
This script starts a Flask web application
"""
from flask import Flask, render_template
from models import storage
from flasgger import Swagger
import uuid

app = Flask(__name__)
swagger = Swagger(app)


@app.teardown_appcontext
def teardown(exception):
    """Removes the current SQLAlchemy Session"""
    storage.close()


@app.route("/1-hbnb", strict_slashes=False)
def hbnb():
    """Renders AirBnB home page"""
    cache_id = uuid.uuid4()
    states = storage.all("State").values()
    amenities = storage.all("Amenity").values()
    places = storage.all("Place").values()
    return render_template(
            "1-hbnb.html",
            states=states,
            amenities=amenities,
            places=places,
            cache_id=cache_id
            )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
