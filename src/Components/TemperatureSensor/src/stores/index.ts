import { configure, makeAutoObservable } from 'mobx'
import { CardStore } from '../../../Card/src/stores'
import { serverFetch } from '../../../Fetch/src/server-fetch'
import { OK } from '../../../Restful/src/http-status'
import { TemperatureSensorConstants } from '../constants'
import { TemperatureSensorItemProps } from '../typings'
configure({
  enforceActions: 'observed',
})
const { id } = TemperatureSensorConstants
class Main {
  public items: TemperatureSensorItemProps[] = []
  public constructor() {
    makeAutoObservable(this)
  }
  public setItems = (items: TemperatureSensorItemProps[]) => {
    this.items = items
  }
  private setEnabledCard = (): void => {
    const { setCard, cards } = CardStore
    const item = cards.find((item) => item.id === id)
    if (!item) {
      return
    }
    if (item.enabled) {
      return
    }
    setCard({
      id,
      enabled: true,
    })
  }
  public fetch = async () => {
    const { data: items, status } = await serverFetch('temperature-sensor')
    if (status === OK) {
      this.setItems(items)
      this.setEnabledCard()
      setTimeout(() => {
        this.fetch()
      }, 1000)
    }
  }
  public get itemsCount() {
    return this.items.length
  }
}
export const TemperatureSensorStore = new Main()
