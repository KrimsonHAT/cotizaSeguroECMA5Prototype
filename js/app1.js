//  Constructor para seguro

function Seguro(marca,anio,tipo){
      this.marca = marca;
      this.anio = anio;
      this.tipo = tipo;

}
Seguro.prototype.cotizarSeguro = function(){
     /*
            1=americano 1.15
            2= asiatico 1.05
            3= europeo 1.35

     */
    let cantidad;
    const base = 2000;

    switch(this.marca){
          case '1':
                cantidad = base*1.15;
          break
          case '2':
            cantidad = base*1.05;
          break
          case '3':
            cantidad = base*1.35;
          break


    }
      //leer el año   
      const diferencia = new Date().getFullYear() - this.anio;  
      //  cvada año de diferencia hay que reducir un 3% el valor del seguro
      cantidad -=  ((diferencia * 3) * cantidad)/100;
      /*
      si el seguro es basico se multipilica por 30% mas
      si es seguro completo 50% mas
      */
     if(this.tipo ==='basico'){
           cantidad *= 1.30;

     }else{
           cantidad *=1.50
     }

     return cantidad;
  
}




// todo lo qe se muestra 

function Interfaz(){};

// Mensaje que se muestra en el html
Interfaz.prototype.mostrarError = function(mensaje,tipo){
            const div = document.createElement('div');
            if(tipo === 'error'){
                  div.classList.add('mensaje','error');
            }else{
                  div.classList.add('mensaje','correcto');
            }
            div.innerHTML = `${mensaje}`;
            formulario.insertBefore(div,document.querySelector('.form-group'));
            
            setTimeout(function(){
                  document.querySelector('.mensaje').remove();

            },3000)
}



// imprime el resultado de la cotizacion

Interfaz.prototype.mostrarResultado = function(seguro,total){
      const resultado = document.querySelector('#resultado');
      let marca;
      
      switch(seguro.marca){
            case '1':
                  marca = "americano";
                  break;
            case '2':
                  marca = "Asiático";
                  break;
            case '3':
                  marca = "Europeo";
                  break;
      }

      const div  =document.createElement('div');
      // insertar la información
      div.innerHTML = `
           <p class="header">Tu resumen:</p> 
           <p>Marca: ${marca} </p>
           <p>año: ${seguro.anio} </p>
           <p>Tipo:${seguro.tipo} </p>
           <p>Total:$${total} </p>
      `;

      const spinner = document.querySelector('#cargando img');
      spinner.style.display = "block";

      setTimeout(function(){
            spinner.style.display = "none";
            resultado.appendChild(div);
      },3000);

      
}

// eventlistenners
const formulario= document.getElementById('cotizar-seguro');
formulario.addEventListener('submit',function(e){
      e.preventDefault();

      // leer la marca del select
      const marca = document.getElementById('marca');
      const marcaSeleccionada = marca.options[marca.selectedIndex].value;

      // leer el año
      const año =document.getElementById('anio');
      const anioSeleccionado = año.options[año.selectedIndex].value;

      // leer el valor del radio button
      const tipo = document.querySelector('input[name="tipo"]:checked').value;


      // crear instancia de Interfaz

      const interfaz = new Interfaz();

      // REvisamos que los campos no esten vacios
      if(marcaSeleccionada == '' || anioSeleccionado == '' || tipo == ''){

            // Interfaz imprimiendo un error
            interfaz.mostrarError('faltan datos revisa el formulario y prueba de nuevo'
            ,'error');
           
      }else{

            // limpiar resultados anteriores
            const resultados = document.querySelector('#resultado div')
            if(resultados != null){
                  resultados.remove();

            }

            // Instanciar seguro y mostarr interfaz
          const seguro = new Seguro(marcaSeleccionada, anioSeleccionado,tipo)
            // cotizar el seguro
            const cantidad = seguro.cotizarSeguro();

            // mostrar el resultado
            interfaz.mostrarResultado(seguro,cantidad)
      }

      
});


const max = new Date().getFullYear();
      min = max -20;
    
const selectAnios = document.getElementById("anio");

for(let i = max; i > min; i--){
      let option = document.createElement('option');
      option.value = i;
      option.innerHTML = i;
      selectAnios.appendChild(option);
}