import { pool } from './database.js';

class LibroController{

	async getAll (req,res){
		
		const [result] = await pool.query("SELECT * FROM libros");
		res.json(result);
	}

	async getOne (req,res){
        
         try{
        const libro = req.body; 
        const id = req.params.id;
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`,[libro.id]);
        

        if(result.length===0){
        	throw new Error('E');
        
        }

      res.json(result);

         

}

          catch (error){

        console.error(error);
		res.status(400).json({Error:'El id que busca no existe'});	
	    }

       
     

	}

	/*Proceso de Agregar Registros*/
	async agregar (req,res){
	    const libro = req.body;
	    try{
	
		const [result] = await pool.query(`INSERT INTO libros(nombre,autor,categoria,anio_public,isbn) VALUES (?,?,?,?,?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_public,libro.isbn]);
		res.json({"Libro Registrado":result.insertId});

		 
	    }catch (e){

	    console.log( e);
		const Error = e.message;
		res.status(400).json({Error});	
	    }

	}

	/*Proceso de Actualizar Registros*/

	async actualizar (req,res){
	    const libro = req.body;
	    try{
		const [result] = await pool.query(`UPDATE libros set nombre=(?),autor=(?),categoria=(?),anio_public=(?) WHERE isbn=(?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_public,libro.isbn]);

		res.json({"Registros actualizados ":result.changedRows});
		
		
	    }catch (e){
		
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	
	    }

	}

		/*Baja de Libro*/

	async Baja (req,res){
	    const libro = req.body;
	    try{
		const [result] = await pool.query(`UPDATE libros set estado=(?) WHERE isbn=(?) and estado='alta'`,[libro.estado,libro.isbn]);

		res.json({"Se dio de Baja el Libro":result.changedRows});
		
		
	    }catch (e){
		
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	
	    }

	}


		/*Alta de Libro*/

	async Alta (req,res){
	    const libro = req.body;
	    try{
		const [result] = await pool.query(`UPDATE libros set estado=(?) WHERE isbn=(?) and estado='baja'`,[libro.estado,libro.isbn]);

		res.json({"Se dio de Alta el Libro":result.changedRows});
		
		
	    }catch (e){
		
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	
	    }

	}
	/*Proceso de Eliminar Registros*/

	async eliminar (req,res){
 	    const libro = req.body;
	    try{
		const [result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`,[libro.isbn]);
		res.json({"Registros Eliminados ":result.affectedRows});

	    }catch (e){
	    console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	

	    }
	}



}


export const libro = new LibroController();