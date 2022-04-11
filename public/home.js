function Home() {
  const { setUser } = React.useContext(UserContext);
  const history = ReactRouterDOM.useHistory();

  

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    if (name && email) {
      setUser({ name, email });
      history.push('/');
    }
  }, [window.location.pathname]);

  return (
    <>
      <Card
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={
          <img src="bank.png" className="img-fluid" alt="Responsive image" />
        }
      />
    </>
  );
}
