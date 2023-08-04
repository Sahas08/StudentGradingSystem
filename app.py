from flask import Flask, render_template
app = Flask(__name__)

@app.route('/TeacherLogin')
def TeacherLogin():
    return render_template('TeacherLogin.html')

@app.route('/StudentLogin')
def StudentLogin():
    return render_template('StudentLogin.html')

@app.route('/AddMarks')
def AddMarks():
    return render_template('AddMarks.html')

if __name__=='__main__':
    app.run(debug=True)