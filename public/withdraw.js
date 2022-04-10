function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [withdraw, setWithdraw] = React.useState('');
  
  
 return (
 
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={ setShow  } setWithdraw={ setWithdraw } setStatus={setStatus} withdraw={ withdraw } setShow={setShow} /> :
        <WithdrawMsg setShow={setShow}/>}
    />
    
  )
      }    

function WithdrawMsg(props){
  return(<>
    <h5>Withdrawl Amount</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(false);}}>
        Successful Withdrawal!
    </button>
  </>);
}


function getAccount( email ) {
  const url = `/account/find/${email}`;
  (async () => {
    const res = await fetch(url);
    const data = await res.json();
    setAccount(data[0]);
  })();  
}

function validate(num, setStatus) {
  if (isNaN(parseFloat(num))) {
    setStatus('Error: Please enter numbers Only');
    setTimeout(() => setStatus(''), 3000);
    return false;
  }
   return true;
}

function WithdrawForm(props){
  console.log('withdraw form props', props);
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(props){
    console.log(email,amount);
    if(!validate(amount, props.setStatus))
        return; 
    const url ='/account/updateWithdraw';
        (async () => {
          const res = await fetch(url, {method: 'PUT', headers: { 'Content-Type': 'application/json'  }, body: JSON.stringify(  { email, amount  } ),   });
            const data = await res.json();
          
        })();
        getAccount(email);
        props.setShow(false);
        clearForm( props.setWithdraw, props.setShow ); 
  } 
   function clearForm( setWithdraw, setShow ) {
    setWithdraw('');
    setShow(false);
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.target.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.target.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

 </>);
 };

