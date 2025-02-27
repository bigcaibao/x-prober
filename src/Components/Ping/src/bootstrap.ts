import { CardStore } from '../../Card/src/stores'
import { gettext } from '../../Language/src'
import { Ping as component } from './components'
import { PingConstants } from './constants'
export const PingBootstrap = (): void => {
  const { id, isEnable } = PingConstants
  isEnable &&
    CardStore.addCard({
      id,
      title: gettext('Network Ping'),
      tinyTitle: gettext('Ping'),
      priority: 250,
      component,
    })
}
