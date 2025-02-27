import { CardStore } from '../../Card/src/stores'
import { gettext } from '../../Language/src'
import { NetworkStats as component } from './components'
import { NetworkStatsConstants } from './constants'
export const NetworkStatsBoostrap = (): void => {
  const { id, isEnable } = NetworkStatsConstants
  isEnable &&
    CardStore.addCard({
      id,
      title: gettext('Network Stats'),
      tinyTitle: gettext('Net'),
      priority: 200,
      component,
    })
}
