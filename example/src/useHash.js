import { useEffect, useState } from 'react'

const getHash = () => document.location.hash.replace('#', '')

export default () => {
  const [hash, setHash] = useState(getHash())
  useEffect(() => {
    function handleHashChange() {
      const hash = getHash() || 'basic'
      setHash(hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener(handleHashChange)
    }
  }, [setHash])
  return hash
}
