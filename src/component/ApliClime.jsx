import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ApliClime = () => {
    /* key : 99fff5c4d9d073d92a9c4d9ebb6f8448 */
    const keyApi ="99fff5c4d9d073d92a9c4d9ebb6f8448 "

    /* Init variables infoClime , Scale */
    let [infoClima , setInfoClima] = useState({})
    /* 0=kelvin  1=celsius 2=Farnaeith */
    let [scaleValue , setScaleValue] = useState(0)
    let [newTemperature ,setNewTemperature] = useState(0)
    let [icon ,setIcon] = useState(0)



       useEffect(() => {
            
            /* Funcion llamada desde geolocation */
           const success = pos => {
                /* Coordenadas geolocation */
               let latitude = pos.coords.latitude;
               let longitude = pos.coords.longitude;

               axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyApi}`)
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(res => { 
                         setInfoClima(res.data)
                         console.log(res.data)
                         /* Recepcion  temperatura */
                         setNewTemperature( (Math.trunc ((res.data.main?.temp - 273.15)*100)/100) + "  ºC")  
                         /* set Icon */
                         setIcon (`http://openweathermap.org/img/wn/${res.data.weather?.[0].icon}@2x.png`)

                    })

           }

            /* Geolocalizacion */
           navigator.geolocation.getCurrentPosition(success)  

        }, [])


    /** Change scale temperature */
    // setNewTemperature( (Math.trunc ((infoClima.main?.temp - 273.15)*100)/100) + "  ºC")  

    const changeScale=()=>{

        /* Grade Kelvin */
        let gradeKelvin = infoClima.main?.temp

        /* Cambio de escala 0 , 1, 2 */
        setScaleValue(scaleValue + 1)
        
        if (scaleValue > 2){
            /* Puesta a cero */
            setScaleValue( scaleValue = 0 )
        }   
 
        /* Change Temperature */
        if(scaleValue == 0 ) {
            /* Grade Celcius  */
            setNewTemperature( (Math.trunc ((gradeKelvin - 273.15)*100)/100) + "  ºC")  
         }else if ( scaleValue === 1){
             /* Grade  Fahrenheit */
            setNewTemperature((Math.trunc (((gradeKelvin - 273.15) * 9/5 + 32)*100)/100) +"  ºF")
        }else{
            setNewTemperature(gradeKelvin +"  ºK")
        }

    }




    return (
        <div className='card-weather'>
            <h1 className='title'>Weather</h1>
            
            <h2>Pais : {infoClima.sys?.country} </h2>
            <h3> {infoClima.name} </h3>

            <div className='clime'>
             <div><img src={icon} /></div>
             <div><h3>{infoClima.weather?.[0].description}</h3></div>
            </div>
 
            <h2>Temperature</h2>
            <p>{newTemperature} </p> 
            <h2>Winter Speed</h2>
            <p>{infoClima.wind?.speed} Meter/Sec</p>
          
   
            <p className='p-border'>Cloud : {infoClima.clouds?.all} %</p>
            <p className='p-border'>Presion : {infoClima?.main?.pressure} mb</p>
            
            <button onClick={changeScale} className='btn-temperature' >Degrees</button>
            <div><small>Change:	Kelvin-Celsius-Fahrenheit</small></div>
            {/* */}
        </div>
    );
};

export default ApliClime;