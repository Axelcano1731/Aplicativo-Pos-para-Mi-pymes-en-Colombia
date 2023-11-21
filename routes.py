from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from Models.Users import Usuario

app = Flask(__name__)
app.secret_key = 'random'

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usu_correo = request.form['correo']
        usu_pass = request.form['passwd']

        usuario_model = Usuario()
        resultado = usuario_model.login(usu_correo, usu_pass)

        if resultado:
            session['usu_id'] = resultado['usu_id']
            session['usu_correo'] = resultado['usu_correo']
            return jsonify({'redirect': url_for('Inicio')})
        else:
            return jsonify({'error': 'Invalid credentials. Please try again.'})

    return render_template('Index.html')


@app.route('/Registro', methods=['GET', 'POST'])
def Registro():
    if request.method == 'POST':
        # Lógica para procesar el formulario de registro
        usu_nom = request.form['usu_nom']
        usu_apep = request.form['usu_apep']
        usu_apem = request.form['usu_apem']
        usu_ced = request.form['usu_ced']
        usu_tel = request.form['usu_tel']
        usu_sex = request.form['usu_sex']
        usu_correo = request.form['usu_correo']
        usu_password = request.form['usu_password']

        usuario_model = Usuario()
        if usuario_model.registro(usu_nom, usu_apep, usu_apem, usu_ced, usu_tel, usu_sex, usu_correo, usu_password):
            return jsonify({'redirect': url_for('login')})
        else:
            return jsonify({'redirect': url_for('login')})  

    return render_template('Registro.html')

@app.route('/404')
def Error():
    return render_template('404.html')

@app.route('/Inicio')
def Inicio():
    if 'usu_id' in session:
        return render_template('Inicio.html')
    else:
        return redirect(url_for('login'))
    
@app.route('/Factura')
def Factura():
    return render_template('factura.html')

@app.route('/Ventas')
def Ventas():
    return render_template('ventas.html')

# @app.route('/FormProductos')
# def Ventas():
#     return render_template('FormProductos.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
    




