// constructor seguro

class Seguro{
    constructor(marca,anio,tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    };
    
    cotizarSeguro(){
    /*
        1= americano 1.15
        2=asiatico  1.05
        3 = europeo 1.35

    */
   let cantidad;
   const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;

    }


    // Leer el año 
    const diferencia = new Date().getFullYear() - this.anio;
//    cada año de diferencia hay que reducir 3% de diferencia
      cantidad -=   (diferencia *0.03) * cantidad;

      /*
      si el seguro es basico se multiplica por 30% mas
      si es completo 50% mas

      */
     if(this.tipo ==='basico'){
        cantidad *=  1.30
     }else{
         cantidad*= 1.50
     }

     return cantidad
   

}
   
}



// Todo lo que se muestra
class Interfaz{
    mostrarMensaje(mensaje,tipo){
        const div = document.createElement('div');
        if(tipo ==='error'){
            div.classList.add('mensaje','error');
        }else{
            div.classList.add('mensaje','correcto');
        }
   
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div,document.querySelector('.form-group'));
    
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        },3000);
        
    }

    
// IOmprime el resultado de la cotización
   mostrarResultado(seguro,total){
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = "Asiático";
            break;
        case '3':
            marca = "Europeo"
            break;
    }

    const div = document.createElement('div');
    // Insertar info
    div.innerHTML = `
        <p class="header">Tu resumen:</p> 
        <p>Marca: ${marca}</p>
        <p>Año:${seguro.anio} </p>
        <p>Tipo:${seguro.tipo}</p>
        <p>Total:$${total}</p>
    `
    const spinner =document.querySelector('#cargando img');
    spinner.style.display = "block";

    setTimeout(function(){
        spinner.style.display = "none";
        resultado.appendChild(div);
    },3000);


   

    

}
}








// Eventlistenners

const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit',function(e){
    e.preventDefault();

    // leer maraca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;


    // leer el año selelecionado del select
    const año = document.getElementById('anio');
    const añoSeleccionado = año.options[año.selectedIndex].value;

    // lee el valor de los radio buttons
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    


    // Crear instancia de Interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos no esten vacios
    if(marcaSeleccionada === '' || añoSeleccionado==='' || tipo ===''){
       
        // Interfaz imprimiendo un error
        interfaz.mostrarMensaje('faltan datos,revisa el formulario','error');

    }else{
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        // Instanciar seguro y mosdtrar interfaz

        const seguro = new Seguro(marcaSeleccionada,añoSeleccionado,tipo);
        
        // cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        //mostrar el resultado seguro
        interfaz.mostrarResultado(seguro,cantidad);
        interfaz.mostrarMensaje('Cotizando ....','exito');
        
    }

});








const max = new Date().getFullYear();
      min = max - 20;

const selectAnios = document.getElementById('anio');

for(let i = max;i >= min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}