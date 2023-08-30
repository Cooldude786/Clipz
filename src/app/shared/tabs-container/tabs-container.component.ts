import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {
  // Instead of make an instance of QueryList with new we can also use optional chaining like below the only goal is to make TypeScript happy.
  // @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList()

  constructor() { }

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(
      tab => tab.active
    )

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs.first)
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(tab => {
      tab.active = false
    })

    tab.active = true

    return false
  }
}
