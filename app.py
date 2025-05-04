from flask import Flask, render_template, request
import random

app = Flask(__name__)

def generate_maze(rows, cols, difficulty):
    maze = [[1 for _ in range(cols)] for _ in range(rows)]

    # Add outer walls
    for i in range(rows):
        maze[i][0] = 0
        maze[i][cols - 1] = 0
    for j in range(cols):
        maze[0][j] = 0
        maze[rows - 1][j] = 0

    # Random internal walls with increasing difficulty
    wall_density = 0.2 + difficulty * 0.01  # More walls as difficulty increases
    wall_density = min(wall_density, 0.45)  # Cap it

    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            if random.random() < wall_density:
                maze[i][j] = 0

    maze[1][1] = 1  # Player start
    maze[rows - 2][cols - 2] = 1  # Goal

    return maze

@app.route('/')
def index():
    return render_template('start.html')

@app.route('/game')
def game():
    level = int(request.args.get('level', 1))
    rows, cols = 20, 20
    maze = generate_maze(rows, cols, difficulty=level)
    return render_template('index.html', maze=maze, rows=rows, cols=cols, level=level)

if __name__ == '__main__':
    app.run(debug=True)
