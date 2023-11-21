$(document).ready(function(){
    $("#loginForm").on('submit', function(e){
        e.preventDefault();

        var correo = $("#correo").val();
        var passwd = $("#passwd").val();

        $.ajax({
            url: login_url,
            method: "POST",
            data: {correo: correo, passwd: passwd},
            success: function(response, textStatus, xhr){
                if (xhr.status === 200 && response.redirect){
                    window.location.href = response.redirect;
                } else {
                    alert("Invalid credentials. Please try again.");
                    $("#passwd").val("");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            }          
        });
    });

    $("#registroButton").on('click', function(){
        var usu_nom = $("#usu_nom").val();
        var usu_apep = $("#usu_apep").val();
        var usu_apem = $("#usu_apem").val();
        var usu_ced = $("#usu_ced").val();
        var usu_tel = $("#usu_tel").val();
        var usu_sex = $("#usu_sex").val();
        var usu_correo = $("#usu_correo").val();
        var usu_password = $("#usu_password").val();
        var usu_confirm_password = $("#usu_confirm_password").val();
        
        // Validar la contraseña y su confirmación
        if (!validarContrasena(usu_password)) {
            alert("La contraseña no cumple con los requisitos mínimos.");
            return;
        }
    
        if (usu_password !== usu_confirm_password) {
            alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
            return;
        }
        
        $.ajax({
            url: registro_url,
            method: "POST",
            data: {
                usu_nom: usu_nom,
                usu_apep: usu_apep,
                usu_apem: usu_apem,
                usu_ced: usu_ced,
                usu_tel: usu_tel,
                usu_sex: usu_sex,
                usu_correo: usu_correo,
                usu_password: usu_password
            },
            success: function(response, textStatus, xhr){
                if (xhr.status === 200 && response.redirect){
                    window.location.href = response.redirect;
                } else {
                    alert("La registración falló. Por favor, inténtelo de nuevo.");
                }
            }
        });
    });
    
            //Parametros minimos para la ceacion de la contraseña
        function validarContrasena(contrasena) {
            
            if (contrasena.length < 8) {
                return false;
            }
            if (!/[A-Z]/.test(contrasena)) {
                return false;
            }
            if (!/[0-9]/.test(contrasena) || !/[a-zA-Z]/.test(contrasena)) {
                return false;
            }
            return true;
        }
    });