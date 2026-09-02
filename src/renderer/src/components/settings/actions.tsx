import { Button, Tooltip } from '@heroui/react'
import SettingCard from '../base/base-setting-card'
import SettingItem from '../base/base-setting-item'
import {
  createHeapSnapshot,
  quitApp,
  quitWithoutCore,
  resetAppConfig
} from '@renderer/utils/ipc'
import { useState } from 'react'
import { version } from '@renderer/utils/init'
import { IoIosHelpCircle } from 'react-icons/io'
import { startTour } from '@renderer/utils/driver'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../base/base-confirm'
import { notify } from '@renderer/utils/notification'

async function handleCreateHeapSnapshot(): Promise<void> {
  try {
    const snapshotPath = await createHeapSnapshot()
    notify(`堆快照已创建\n${snapshotPath}`, { variant: 'success' })
  } catch (e) {
    notify(`创建堆快照失败\n${e}`, { variant: 'danger' })
  }
}

const Actions: React.FC = () => {
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <>
      {confirmOpen && (
        <ConfirmModal
          onChange={setConfirmOpen}
          title="确认删除配置？"
          description={
            <>
              ⚠️ 删除配置，
              <span className="text-red-500">操作不可撤销</span>
            </>
          }
          confirmText="确认删除"
          cancelText="取消"
          onConfirm={resetAppConfig}
        />
      )}
      <SettingCard>
        <SettingItem compatKey="legacy" title="打开引导页面" divider>
          <Button size="sm" onPress={() => startTour(navigate)}>
            打开引导页面
          </Button>
        </SettingItem>
        <SettingItem
          compatKey="legacy"
          title="重置软件"
          actions={
            <Tooltip content="删除所有配置，将软件恢复初始状态">
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={() => setConfirmOpen(true)}>
            重置软件
          </Button>
        </SettingItem>
        <SettingItem
          compatKey="legacy"
          title="清除缓存"
          actions={
            <Tooltip content="清除软件渲染进程缓存">
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={() => localStorage.clear()}>
            清除缓存
          </Button>
        </SettingItem>
        <SettingItem
          compatKey="legacy"
          title="创建堆快照"
          actions={
            <Tooltip content="创建主进程堆快照，用于排查内存问题">
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={handleCreateHeapSnapshot}>
            创建堆快照
          </Button>
        </SettingItem>
        <SettingItem
          compatKey="legacy"
          title="保留内核退出"
          actions={
            <Tooltip content="完全退出软件，只保留内核进程">
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={quitWithoutCore}>
            退出
          </Button>
        </SettingItem>
        <SettingItem compatKey="legacy" title="退出应用" divider>
          <Button size="sm" onPress={quitApp}>
            退出应用
          </Button>
        </SettingItem>
        <SettingItem compatKey="legacy" title="应用版本">
          <div>v{version}</div>
        </SettingItem>
      </SettingCard>
    </>
  )
}

export default Actions