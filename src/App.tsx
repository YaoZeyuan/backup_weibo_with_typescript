import React, { Component } from 'react'
import logo from './stablog_logo_256x256.png'
import svg_logo_window from './static/windows.svg'
import svg_logo_mac from './static/mac.svg'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import './App.less'

export default class Base extends Component {
  state = {
    showThankList: false,
    config: {
      downloadUrl: 'https://github.com/YaoZeyuan/stablog#%E8%BD%AF%E4%BB%B6%E4%B8%8B%E8%BD%BD',
      releaseAt: '2019年10月22日',
      releaseNote: '稳部落1.1.0, 闪亮发布.',
      version: 1.1,
      detail: {
        windows: { version: 1.1, url: 'http://stablog.bookflaneur.cn/%E7%A8%B3%E9%83%A8%E8%90%BD%20Setup%201.1.0.exe' },
        mac: { version: 1.1, url: 'http://stablog.bookflaneur.cn/%E7%A8%B3%E9%83%A8%E8%90%BD-1.1.0.dmg' },
      },
    },
    thankList: [{ reason: '*明明捐助了25元', time: '2019-10-14 21:34' }],
  }

  async componentDidMount() {
    let versionResponse = await axios.get('https://api.bookflaneur.cn/stablog/version')
    let thankListResponse = await axios.get('https://api.bookflaneur.cn/stablog/thank_you/list')
    let config = versionResponse.data
    let thankList = thankListResponse.data
    this.setState({
      config,
      thankList,
    })
  }

  toggleThankList = () => {
    this.setState({
      showThankList: !this.state.showThankList,
    })
  }

  render() {
    const { config, thankList, showThankList } = this.state
    let thankEleList = []
    let counter = 0
    for (let item of thankList) {
      let index = counter
      let itemEle = (
        <div key={index} className="thank-list-item">
          <div className="thank-list-item-time">{item.time}</div>
          <div className="thank-list-item-reason">{item.reason}</div>
        </div>
      )
      thankEleList.push(itemEle)
      counter++
    }
    console.log('showThankList =>', showThankList)
    return (
      <div className="Home">
        <div className="body">
          <div className="container">
            <div className="title">稳部落</div>
            <div className="slogan">专业备份导出微博记录</div>
            <div className="version">---项目原理---</div>
            <div className="desc">软件本身就是一个内置了微博的移动版页面的浏览器</div>
            <div className="desc">
              在软件内登录&nbsp;
              <a href="https://m.weibo.cn" target="_blank">
                m.weibo.cn
              </a>
              &nbsp;后
            </div>
            <div className="desc">软件模拟浏览器, 自动浏览登录用户发布的所有微博, 并记录到数据库里</div>
            <div className="desc">访问完毕后将每条微博截屏成图片, 码在pdf中, 即为备份.</div>
            <div className="desc">
              (为方便查找, 在每个图片前加上了微博的文字版, 这样pdf里一搜就能搜到对应微博所在位置)
            </div>
            <div className="desc">
              所以, 即使炸号, 只要登录&nbsp;
              <a href="https://m.weibo.cn" target="_blank">
                m.weibo.cn
              </a>
              &nbsp; 后还能看见自己的微博,就可以备份
            </div>
            <div className="desc">
              (反过来, 如果
              <a href="https://m.weibo.cn" target="_blank">
                m.weibo.cn
              </a>
              都登录不了, 就没办法了)
            </div>
            <div className="desc"></div>
            <div className="version">---最新版本：v{`${config.version}`.padEnd(3, '.0')}---</div>
            <div className="logo">
              <img src="https://tva1.sinaimg.cn/large/007Yq4pTly1h4rkzfkfx5j3074074ab5.jpg" alt="logo" />
            </div>
            <div className="download-container">
              <div className="download-tip">下载</div>
              <div className="action-line">
                <a className="download-button" target="_blank" href={config.detail.windows.url}>
                  <img className="download-button-icon" src={svg_logo_window} />
                  Windows版({config.detail.windows.version})
                </a>
                <a className="download-button" target="_blank" href={config.detail?.['mac']?.url}>
                  <img className="download-button-icon" src={svg_logo_mac} />
                  Mac版({config.detail?.['mac'].version})
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="comment">
            <a className="tip" href="https://github.com/YaoZeyuan/stablog" target="_blank">
              使用指南
            </a>
            <p className="tip" onClick={this.toggleThankList}>
              致谢列表
            </p>
            <a className="tip" href="https://github.com/YaoZeyuan/stablog/issues" target="_blank">
              功能建议
            </a>
          </div>
          <CSSTransition in={this.state.showThankList} timeout={300} classNames="fade" unmountOnExit>
            <div className="thank-list">{thankEleList}</div>
          </CSSTransition>
        </div>
        <a href="https://github.com/YaoZeyuan/stablog" className="fork-me-on-github" target="_blank">
          <img
            width="149px"
            height="149px"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_green_007200.png?resize=149%2C149"
            alt="Fork me on GitHub"
          />
        </a>
      </div>
    )
  }
}
