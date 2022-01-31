import { getConnection, sql, queries } from "../database";

export const getProducts = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProducts);
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error,message);
    }
};

export const createNewProduct = async (req,res) => {
    const {name,description} = req.body;
    let {quantity} = req.body;

    if(name == null || description == null){
        return res.status(400).json({
            msg: 'Por favor llena todos los campos'
        })
    }
    if(quantity == null) quantity = 0;
    try {
        const pool = await getConnection();
        await pool.request()
        .input('name',sql.VarChar,name)
        .input('description',sql.VarChar,description)
        .input('quantity',sql.VarChar,quantity)
        .query(queries.insertProduct);
    
        console.log(name,description,quantity);
        res.json('new product');
    } catch (error) {
        res.status(500);
        res.send(error,message);
    }
}

export const getProductById = async (req,res)=>{
    const {id} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Id',id).query(queries.getProductById);
    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
}

export const deleteProductById = async (req,res)=>{
    const {id} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Id',id).query(queries.deleteProduct);
    console.log(result);
    res.send('Producto eliminado exitosamente!!');
}

export const getTotalProducts = async (req,res)=>{
    const pool = await getConnection();
    const result = await pool.request()
    .query(queries.getTotalProducts);
    console.log(result.recordset[0]['']);
    res.json(result.recordset[0]['']);
}


export const updateProductById = async(req,res)=>{
    const {name,description,quantity} = req.body;
    const {id} = req.params;
    if(name == null || description == null || quantity == null){
        return res.status(400).json({
            msg: 'Por favor llena todos los campos'
        })
    }
    const pool = await getConnection();
    pool.request()
        .input('name',sql.VarChar,name)
        .input('description',sql.VarChar,description)
        .input('quantity',sql.VarChar,quantity)
        .input('id', sql.Int, id)
        .query(queries.updateProductById);

    res.json({
        name,
        description,
        quantity
    })
}