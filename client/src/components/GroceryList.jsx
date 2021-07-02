const GroceryList = ({groceries}) => {
  return (
    <div>
      <h1>Inköpslista</h1>
      {groceries ? <ul>
        { groceries.map(grocery =>( 
          <li>{grocery.Namn}: {grocery.Varde}{grocery.Enhet}</li>))}
      </ul>
      :<p>Ingen inköpslista, skapa en på hemma fliken</p>}
    </div>
  )
}

export default GroceryList;