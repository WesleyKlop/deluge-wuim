// @flow
import React from 'react'
import classnames from 'classnames'
import { ProgressBar, Tabs, Tab } from 'react-mdl'
import ListItem from './TorrentDetailsListItem'
import s from './TorrentDetails.css'
import TabContent from './TabContent'
import { bytesToSize } from '../lib/Helpers'

type TorrentDetailsProps = {
  name: string,
  comment: string,
  progress: number,
  eta: number,
  state: string,
  total_size: number,
  activeTab: number,
  onTabChange: () => void,
  // upload_payload_rate: number,
  // download_payload_rate: number,
  all_time_download: number,
  total_uploaded: number,
  ratio: number,
}

const TorrentDetails = ({
  name, comment, progress, state, total_size: totalSize, activeTab, onTabChange,
  // upload_payload_rate: uploadPayloadRate, download_payload_rate: downloadPayloadRate,
  all_time_download: allTimeDownload, total_uploaded: totalUploaded, ratio, eta,
}: TorrentDetailsProps) => (
  <div>
    <div className={classnames(s.statusContainer)}>
      <h1 className={s.name} title={name}>{name}</h1>
      <div className={s.subTitle}>{comment}</div>
      <span className={s.torrentState}>{state}</span>
      <span className={s.torrentSize}>{Math.round(progress)}%</span>
      <ProgressBar progress={progress} title={`${Math.round(progress)}%`} />
      <Tabs activeTab={activeTab} ripple onChange={onTabChange} className={s.tabBar}>
        <Tab>Overview</Tab>
        <Tab>Files</Tab>
        <Tab>Peers</Tab>
      </Tabs>
    </div>

    <TabContent activeTab={activeTab}>
      <div>
        <h3 className={classnames(s.header, 'mdl-color-text--primary')}>Data</h3>
        <ul className={classnames(s.listContainer, 'mdl-shadow--2dp')}>
          <ListItem label="ETA" title={eta} />
          <ListItem label="Size" title={bytesToSize(totalSize)} alignRight />
          <ListItem label="Downloaded" title={bytesToSize(allTimeDownload)} />
          <ListItem label="Uploaded" title={bytesToSize(totalUploaded)} alignRight />
          <ListItem label="Ratio" title={ratio.toFixed(2)} />
        </ul>
      </div>
      <div />
      <div />
    </TabContent>
  </div>
)

export default TorrentDetails
