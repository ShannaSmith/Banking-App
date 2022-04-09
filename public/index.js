
const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};



function Spa() {;

  const [user, setUser] = React.useState('')

  const userdetails = localStorage.getItem("data");
console.log(userdetails)
       React.useEffect(()=> {   
               try{ const jwt = localStorage.getItem("name");
                // const user = jwtDecode(jwt);
                setUser( jwt );
                console.log(user)
        }catch(ex){}
        },[])

  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            {/* <Route element={<ProtectedRoute user={userdetails} />}> */}
          <Route path="/deposit/" component={userdetails ? Deposit : Login} />
          {/* <Route path="dashboard" element={<Dashboar />} /> */}
        {/* </Route> */}

            {/* <Route path="/deposit/" component={Deposit} user={userdetails}  /> */}
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
