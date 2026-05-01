import {useState,useEffect,useRef} from "react"
import AnxiosInstance from "../prop/GetToken";
function Artists(){
    const [artistCurrent,setArtist] = useState(null)
    const [addName,setAddName] = useState('')
    const name = useRef()
    useEffect(()=>{
            AnxiosInstance.get('artist/').then(res=>setArtist(res.data)).catch(err=>console.log(err))
    },[])
    const render = artistCurrent && artistCurrent.map((a)=> <tr key={a.id}>
      <td>{a.name}</td>
      <td>{a.total_song}</td>
      <td>{a.total_album}</td>
      <td onClick={()=>handleDelete(a.id)}>Delete</td>
      <td>Edit</td>
    </tr>)
    const handleAddArtist = () => {
  const formData = new FormData()
  formData.append('name', name.current.value)
  AnxiosInstance.post('artist/', formData)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}
    const handleDelete = (id)=>{
  AnxiosInstance.delete(`artist/${id}/`)
    .then(() => {
      setArtist(prev => prev.filter(item => item.id !== id))
    })
    .catch(err => console.log(err))
}
return(
    <div className="ManageUsers Artists">
            <h1>Artists</h1>
            <div>
  <label htmlFor="browser" className="form-label">Search Artists:</label>
  <div className="d-flex">
    <div>
          <input className="form-control" list="browsers" name="browser" id="browser" />
  <datalist id="browsers">
    <option value="Edge" />
    <option value="Firefox" />
    <option value="Chrome" />
    <option value="Opera" />
    <option value="Safari" />
  </datalist>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Ad New
</button>


<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

  
      <div class="modal-header">
        <h4 class="modal-title">Ad New</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

     
      <div class="modal-body">
        <div>
            <label  className="form-label">Name:</label>
            <input ref={name} type="text" className="form-control" id="email" placeholder="Enter name" name="name" onChange={(e)=>setAddName(e.target.value)} />
            </div>
      </div>

    
      <div class="modal-footer">
        <button type="button" class="btn btn-info" onClick={handleAddArtist}>Add</button>
      </div>

    </div>
  </div>
</div>
  </div>
</div>

            <div className="scroll-table">
              <table className="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Name</th>
      <th>Total Album</th>
      <th>Total song</th>
      <th colSpan="2">Action</th>
    </tr>
  </thead>
  <tbody>
    {render}
  </tbody>
</table>
            </div>


        </div>
)
}
export default Artists