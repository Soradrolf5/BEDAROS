const fs = require('fs')

class ProductManager { 

    constructor(path) { 
        this.path = path
        this.products  = []
    } 

    addProduct(product){
        const {prodName, prodDescription, prodCategory, prodPrice, prodThumbnail, prodStock, prodCode} = product;
        
        const prodToArray = {
            id: 1,
            product: prodName,
            description: prodDescription,
            category: prodCategory,
            price: prodPrice,
            thumbnail: prodThumbnail,
            stock: prodStock,
            code: prodCode,
        }

        const isValid = validateParams(product)
      
        //console.log(isValid)
        
        if(isValid){
            // Busca el código del producto y si existe no lo agrega,
            // caso contrario agregará el producto con un ID incremental.
            const exist = this.products.some(p => p.code === prodToArray.code);
            if(exist){
                console.log('El producto existe');
            } else {
                prodToArray.id = this.products.length + 1;
                this.products.push(prodToArray);
                fs.promises.writeFile(this.path, JSON.stringify(this.products))
            }
        } else {
            console.log('Debes completar todos los campos');
        }

        console.log(this.products);        
    }

    
    


    getProductById(id){
        const prod = this.products.find( p => p.id === id);
        //console.log(prod);

        if(prod === undefined){
            console.log('Not found');
        } else {
            return prod;
        }
    }
    getProducts(){
        return this.products;
    }

    updateProduct ( id ,  updatedProduct) {
        const  productToUpdate  =  this.products.find(  product  =>  product.id  ==  id  )
        if ( product ) {
            const  isRepeated  =  this.products.some ((productSaved)  =>  productSaved.code  ==  updatedProduct.code )  // comprueba si el código del producto ya existe
            if ( isRepeated ==  false ) {
                this.products [ id  -  1 ]  =  {
                    ... this.products [ id  -  1 ] ,  // valores anteriores
                    ... updatedProduct  // nuevos valores
                }

                const  jsonData  =  JSON.stringify (this.products)
                fs.writeFileSync ( this.path , jsonData )
                console.log("Producto actualizado con éxito")
            } else {
                return  ("Ya existe un producto con el código: "  +  updatedProduct.code)
                
            }
        } else {
            return  ("No hay producto con el id: "  +  id)
        }
    }

    deleteProduct ( id ) {
        const  deletedProduct  =  this.product.find (  product  =>  product.id  ==  id  )
        if (deletedProduct) {
            this.products  =  this.products.filter (  product  =>  product.id  !==  id  )
            const  jsonData  =  JSON.stringify ( this.products )
            fs.writeFileSync ( this.path , jsonData )
            return ("Producto eliminado con éxito")
        } else {
            return  ("No hay producto con el id: "  +  id)
        }
    }
}




//funciones de validación de strings y numbers.
function validateParams(product){
    const { prodName, prodDescription, prodCategory, prodPrice, prodThumbnail, prodStock, prodCode } = product;
    
    let isValid;

    //Validación de parámetros creo un objeto, 
    const objectValidation = {
        validName: validateStringParams(prodName),
        validDesc: validateStringParams(prodDescription),
        validCategory: validateStringParams(prodCategory),
        validThumbnail: validateStringParams(prodThumbnail),
        validPrice: validateNumberParams(prodPrice),
        validStock: validateNumberParams(prodStock),
        validCode: validateStringParams(prodCode),
    }

    if(Object.values(objectValidation).every(el => el === true)){
        isValid = true;
    } else {
        isValid = false;
    }

    return isValid;
}
function validateStringParams(stringParam){
    
    let isValid;
    
    if(stringParam === undefined){
        isValid = false;
    } else if(!isNaN(stringParam)){
        isValid = false;
    } else if (stringParam.trim() === ""){
        isValid = false;
    }else {
        isValid = true;
    }
    return isValid;
no}
function validateNumberParams(numberParam){
    
    let isValid;
    if(numberParam === undefined){
        isValid = false;
    } else if (isNaN(numberParam)){
        isValid = false;
    } else {
        isValid = true;
    }
    return isValid;
}
const manager = new ProductManager ()
manager.addProduct ("Bicicleta", "lorem", 1000, "url", 60)
manager.getProducts()
manager.getProductById(2)


