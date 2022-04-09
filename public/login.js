function Login(){const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(' ');

  return(
      <Card
          bgcolor="secondary"
          header="Login"
          status={status}
          body={show ?
              <LoginForm setShow={setShow}/> :
              <LoginMsg setShow={setShow}/>}
      />
  )
}

function LoginMsg(props){
  return(<>
  <h5>Welcome Back</h5>
  <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>Logout</button>
      </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin(){
      console.log(email,password);
      const url = `/account/login/${email}/${password}`;
      (async () => {

    var res = await  fetch(url, {
              method: "GET",
          
        //   body: JSON.stringify({
        //       email:email ,
        //       password: password
        //   })
        })
          .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.success) {
                       console.log("res2", res.success);
                       localStorage.setItem("name", res.user.name);
                       localStorage.setItem('data', res.user);
                       console.log('res.', res.user.name);

                       window.location.href = './#/deposit'
        }
    })
      
      })();
    //   props.setShow(false);
  }
  
  return (<>

  Email address<br/>
  <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

  Password<br/>
  <input type="password"
  className="form-control"
  placeholder="Enter password"
  value={password}
  onChange={e => setPassword(e.currentTarget.value)}/><br/>

  <button type="submit"
      className="btn btn-light"
      onClick={handleLogin}>Login</button>
  </>);
}