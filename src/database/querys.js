export const queries = {
    getAllProducts: "SELECT * FROM Products",
    insertProduct: "INSERT INTO Products (name,description,quantity) VALUES (@name,@description,@quantity)",
    getProductById: "SELECT * FROM Products  where Id = @Id",
    deleteProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE Id = @Id",
    getTotalProducts: "SELECT COUNT(*) FROM [webstore].[dbo].[Products]",
    updateProductById: 'UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @Id'
}