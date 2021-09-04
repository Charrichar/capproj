
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const address = "http://localhost:3003/products"

  //--------_States---------//
  const [newImage, setNewImage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newInventory, setNewInventory] = useState([])

  useEffect(()=>{
    axios
      .get('http://localhost:3003/products')
      .then((response) => {
        console.log(response);
        setNewInventory(response.data)
      })
  }, [])

    //---------- Create ----------//
    const handleNewImageChange = (event) =>{
        setNewImage(event.target.value);
    };

    const handleNewPriceChange = (event) =>{
        setNewPrice(event.target.value);
    };

    const handleNewNameChange = (event) =>{
        setNewName(event.target.value);
    };

    const handleNewDescriptionChange = (event) =>{
        setNewDescription(event.target.value);
    };


    const handleNewProductSubmit = (event) =>{
        event.preventDefault();
        axios.post(
            address,
            {
                image: newImage,
                price: newPrice,
                name: newName,
                description: newDescription

            }
        ).then(()=>{
            axios
                .get(address)
                .then((response)=>{
                    setNewInventory(response.data);
                });
        });
    };

  //=============Delete============//

  const handleDelete = (item) =>{
    axios
      .delete(`${address}/${item.id}`)
      .then(() => {
        axios
          .get('http://localhost:3003/products')
          .then((response) => {
            setNewInventory(response.data)
          })
      })
  }

  //===========Edit==============//
  const handleEdit = (item)=>{
  let inv = {
        image: newImage,
        price: newPrice,
        name: newName,
        description: newDescription
      }

          axios
              .put(
                  `${address}/${item.id}`,
                  inv

              ).then(()=>{
                  axios
                      .get(address)
                      .then((response)=>{
                          setNewInventory(response.data)
                      })
              })
      }


  return (
      <>
      <div className="container">
      <h1> Web Store </h1>

      <form onSubmit={handleNewProductSubmit}>
              New Image: <input type="text" onChange={handleNewImageChange}/><br/>
              New Price: <input type="text" onChange={handleNewPriceChange}/><br/>
              New Name: <input type="text" onChange={handleNewNameChange}/><br/>
              New Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
              <input type="submit" value="Create New Product"/>
          </form>

          <br/>

          <h2>Products</h2>
          {newInventory.length > 0 ?
                        newInventory.map((product) => {
                            return(
                                    <div class="product">
                                      <img src={product.image} alt=''/>
                                      <h3 class= "price">${product.price}</h3>
                                      <h3 class="name">{product.name}</h3>
                                      <p class="description">{product.description}</p>

                                        <div>
                                          <button class="delete" onClick={(event)=>{handleDelete(product)}}>delete
                                          </button>
                                          <details>
                                            <summary>
                                                Edit Product
                                            </summary>
                                            <form onSubmit={()=>{handleEdit(product)}}>
                                                Image: <input type="text" defaultValue={product.image} onChange={handleNewImageChange}/><br/>
                                                Price: <input type="text" defaultValue={product.price} onChange={handleNewPriceChange}/><br/>
                                                Name: <input type="text" defaultValue={product.name} onChange={handleNewNameChange}/><br/>
                                                Description: <input type="text" defaultValue={product.description} onChange={handleNewDescriptionChange}/><br/>

                                                <input class="button" type="submit" value="Save Change"/>
                                            </form>
                                          </details>
                                        </div>


                                    </div>
                            )
                        })
                : <h1>false</h1>}
                  </div>

        </>

  );

}



export default App;
