const Logout=()=>{

    const handlelogout=()=>{
    localStorage.clear();
    window.location = "./#"
    }
    return(
        <div className="nav-item ">
        <a className="nav-link" id="logout" href="#/" onClick={handlelogout}>logout</a>
      </div> 

    )
  }