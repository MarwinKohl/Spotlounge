const Clock = () => {
    let time = new Date().toLocaleTimeString();
    return (
      <div >
        <h1>{time}</h1>
      </div>
    
    )
  }
  
  export default Clock; 