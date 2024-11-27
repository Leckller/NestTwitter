import { useState } from "react"
import { FaSearch } from "react-icons/fa";

function Search() {
  const [text, setText] = useState('');

  return (

    <main>
      <nav>
        <label>
          <FaSearch />
          <input
            type="text"
            value={text}
            onChange={({ target: { value } }) => setText(value)}
          />
        </label>
      </nav>
    </main>

  )
}

export default Search