import React, { useEffect, useState } from 'react'
import { Select, SelectItem } from '@heroui/react'
import { getInterfaces } from '@renderer/utils/ipc'

const InterfaceSelect: React.FC<{
  value: string
  exclude?: string[]
  onChange: (iface: string) => void
}> = ({ value, onChange, exclude = [] }) => {
  const [ifaces, setIfaces] = useState<string[]>([])
  useEffect(() => {
    const fetchInterfaces = async () => {
      const names = Object.keys(await getInterfaces())
      setIfaces(names.filter((name) => !exclude.includes(name)))
    }
    fetchInterfaces()
  }, [])

  return (
    <Select
      size="sm"
      className="w-[300px]"
      selectedKeys={new Set([value])}
      disallowEmptySelection={false}
      onSelectionChange={(v) => onChange(v.currentKey as string)}
    >
      <SelectItem key="">禁用</SelectItem>
      <>
        {ifaces.map((name) => (
          <SelectItem key={name}>{name}</SelectItem>
        ))}
      </>
    </Select>
  )
}

export default InterfaceSelect
