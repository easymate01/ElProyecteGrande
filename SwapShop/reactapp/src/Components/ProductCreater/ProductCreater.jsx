import { useState } from "react"
import "./Product.css"
const ProductCreator = () => {
    const [name, setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice]= useState(0);
    const [category, setCategory] = useState("");
    
    const handelAddProduct = (e)=>{
        e.preventDefault();

        fetch(`https://localhost:7035/create/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:name, description: description, price:price, category:category
        }),
        })
      .then((res) => res.json())
      .then((data) => {
        console.log("Createing Product response:", data);
      })
      .catch((error) => {
        console.error("Createing Product error:", error);
      });
    }
    return (
        <>
            <div className="nice-form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="nice-form-group">
                <label>Description</label>
                <input type="text" placeholder="Description" value={description}  onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="nice-form-group">
                <label>Price</label>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="nice-form-group">
                <label>Category</label>
                <input type="text" placeholder="Category" value={category}  onChange ={(e) => setCategory(e.target.value)}/>
            </div>

            <div>
                <button type="submit" onClick={handelAddProduct}>Add Product</button>
            </div>
        </>
    )
    
}
export default ProductCreator;