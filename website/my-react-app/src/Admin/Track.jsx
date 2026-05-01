import {useState,useEffect,useRef} from "react"
import AnxiosInstance from "../prop/GetToken";
function Track(){
  const [audio,setAudio] = useState(null)
  const [video,setVideo] = useState(null)
  const [artistCurrent,setArtist] = useState(null)
  const [albumCurrent,setAlbum] = useState(null)
  const [reload,setReload] = useState(false)
  useEffect(
    ()=>{
      AnxiosInstance.get('track/?category=audio').then(res=>setAudio(res.data)).catch(err=>console.log(err))
      AnxiosInstance.get('track/?category=video').then(res=>{setVideo(res.data);console.log(res.data)}).catch(err=>console.log(err))
      AnxiosInstance.get('artist/').then(res=>setArtist(res.data)).catch(err=>console.log(err))
      AnxiosInstance.get('album/?fields=id,title,image_url,decription').then(res=>setAlbum(res.data)).catch(err=>console.log(err))
    },[reload])
    const [isPrenium,setIsPrenium] = useState(false);
    const [categoryCurrent,setCagoryCurrent] = useState("audio")
    const handleSearch = (e) =>{
      AnxiosInstance.get('searchFull',{
      params:{
        category:'audio',
        title:e.target.value
      }
    }).then(res=>{setAudio(res.data)
    }
  )
    .catch(err=>console.log(err))
    AnxiosInstance.get('searchFull',{
      params:{
        category:'video',
        title:e.target.value
      }
    }).then(res=>{setVideo(res.data)
    })
    .catch(err=>console.log(err))
    }
    const handleDelete = (id)=>{
  AnxiosInstance.delete(`TrackChanging/${id}/`)
    .then(() => {
      setAudio(prev => prev.filter(item => item.id !== id))
      setVideo(prev => prev.filter(item => item.id !== id))
    })
    .catch(err => console.log(err))
}
    const renderListAudio = audio&& audio.filter(value=>value.is_Prenium==false).map(a => <tr key={a.id}>
<td>{a.title}</td>
<td>{a.artists}</td>
<td>{a.release_date}</td>
<td>{a.file}</td>
<td onClick={()=>handleDelete(a.id)}>Delete</td>
<td>Edit</td>
</tr>)

    const renderListAudioPrenium = audio&& audio.filter(value=>value.is_Prenium==true).map(a => <tr key={a.id}>
<td>{a.title}</td>
<td>{a.artists}</td>
<td>{a.release_date}</td>
<td>{a.file}</td>
<td onClick={()=>handleDelete(a.id)}>Delete</td>
<td>Edit</td>
</tr>)
   const renderVideo= video&& video.filter(value => value.is_Prenium==false).map(a => <tr>
<td>{a.title}</td>
<td>{a.artists}</td>
<td>{a.release_date}</td>
<td>{a.file}</td>
<td onClick={()=>handleDelete(a.id)}>Delete</td>
<td>Edit</td>
</tr>)
   const renderVideoPrenium= video&& video.filter(value => value.is_Prenium==true).map(a => <tr>
<td>{a.title}</td>
<td>{a.artists}</td>
<td>{a.release_date}</td>
<td>{a.file}</td>
<td onClick={()=>handleDelete(a.id)}>Delete</td>
<td>Edit</td>
</tr>)
    const name = useRef()
    const album = useRef()
    const category = useRef()
    const file = useRef()
    const fileImg = useRef()
    const artists = useRef()
    const handleSubmit = ()=>{
      const formdata = new FormData()
      formdata.append('title',name.current.value)
      formdata.append('album',album.current.value)
      formdata.append('artists',artists.current.value)
      formdata.append('category',category.current.value)
      formdata.append('is_Prenium',isPrenium)
      formdata.append('file',file.current.files[0])
      formdata.append('fileImg',fileImg.current.files[0])
      AnxiosInstance.post('TrackChanging/',formdata,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      }).then(res=>console.log(res.data))
      .catch(res=>console.log(res))
    }
    const Render = ()=>{
      if(categoryCurrent=="audio" && isPrenium){
        return renderListAudioPrenium
      }else if(categoryCurrent=="audio" && !isPrenium){
        return renderListAudio
      }else if(isPrenium){
        return renderVideoPrenium
      }else{
         return renderVideo
      }
    }
return(
    <div className="ManageUsers Track">
    <h1>Track</h1>
    <div>
        <h3>Category</h3>
        <div className="Track-Category">
                    <select class="form-select" onChange={(e)=>setCagoryCurrent(e.target.value)}>
  <option value="audio">Audio</option>
  <option value="video">Video</option>
</select>
<select
  className="form-select"
  onChange={(e) => setIsPrenium(e.target.value === "true")}
>
  <option value="true">Prenium</option>
  <option value="false">Free</option>
</select>
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add New</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form action="" className="formADD">
            <div>
            <label  className="form-label">Name:</label>
            <input type="text" ref={name} className="form-control" id="email" placeholder="Enter name" name="name" />
            </div>
            <div>
            <label className="form-label" >Select Artist</label>
            <select ref={artists} className="form-select">
              {artistCurrent && artistCurrent.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
</select>
            <label className="form-label" >Select Album</label>
            <select className="form-select" ref={album}>
           {albumCurrent && albumCurrent.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
</select>
            </div>
            <div>
            <label className="form-label">Select Category</label>
            <select ref={category} className="form-select">
  <option value='video'>Video</option>
  <option value='audio'>Audio</option>
</select>
            </div>
            <div>
            <label className="form-label">Is Prenium?</label>
            <div className="form-checking">
                            <div class="form-check" >
  <input type="radio" class="form-check-input" id="radio1" name="optradio" value="Prenium" checked={isPrenium===true} onClick={(e)=>setIsPrenium(!isPrenium)}/>
  <label class="form-check-label" for="radio1">Prenium</label>
</div>
<div class="form-check">
  <input type="radio" class="form-check-input" id="radio2" name="optradio" value="Free" checked={isPrenium===false} onClick={(e)=>setIsPrenium(!isPrenium)} />
  <label class="form-check-label" for="radio2">Free</label>
</div>
            </div>
            </div>
          <div>
            <label class="form-check-label" >File image</label> <br />
            <input type="file" ref={fileImg}/>
            </div>
            <div>
               <label class="form-check-label" >File</label><br />
            <input type="file" ref={file}/>
            </div>
        </form>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-info" onClick={handleSubmit}>Add</button>
      </div>
    </div>
  </div>
</div>
        </div>

    </div>
    <div>
    <label htmlFor="browser" className="form-label">Search:</label>
    <div className="d-flex">
      <div>
            <input className="form-control" type="search" name="browser" placeholder="Name of track" onChange={(e)=>handleSearch(e)} />
      </div>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Add New
</button>
    </div>

    </div>

    <div className="scroll-table">
      <table className="table table-striped table-bordered table-hover">
<thead>
<tr>
<th>Name</th>
<th>Artistis</th>
<th>Release date</th>
<th>URL</th>
<th colSpan="2">Action</th>
</tr>
</thead>
<tbody>
{Render()}
</tbody>
</table>
    </div>
</div>
)
}
export default Track