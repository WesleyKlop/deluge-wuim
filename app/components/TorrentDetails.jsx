// @flow
import React from 'react'
import classnames from 'classnames'
import { ProgressBar, Tabs, Tab } from 'react-mdl'
import ListItem from './TorrentDetailsListItem'
import s from './TorrentDetails.css'
import TabContent from './TabContent'
import { bytesToSize, timestampToFormat, timestampToRange, formatNumber } from '../lib/Helpers'
import FileList from './FileList'
import TrackerList from './TrackerList'
import PeerList from './PeerList'
import type { Tracker, Peer } from '../lib/Deluge/types'

type TorrentDetailsProps = {
  name: string,
  comment: string,
  progress: number,
  eta: number,
  state: string,
  total_size: number,
  activeTab: number,
  onTabChange: () => void,
  upload_payload_rate: number,
  download_payload_rate: number,
  all_time_download: number,
  total_uploaded: number,
  ratio: number,
  num_files: number,
  total_peers: number,
  total_seeds: number,
  time_added: number,
  active_time: number,
  files: [],
  trackers: Tracker[],
  peers: Peer[],
}

const TorrentDetails = ({
  name, comment, progress, state, total_size: totalSize, activeTab, onTabChange,
  upload_payload_rate: uploadRate, download_payload_rate: downloadRate,
  all_time_download: allTimeDownload, total_uploaded: totalUploaded, ratio, eta,
  num_files: fileCount, total_peers: totalPeers, total_seeds: totalSeeds, active_time: activeTime,
  time_added: timeAdded, files, peers, trackers,
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
        <Tab>Connections</Tab>
      </Tabs>
    </div>

    <TabContent activeTab={activeTab}>
      <ul className={classnames(s.listContainer, 'mdl-shadow--2dp')}>
        <ListItem label="Down speed" title={downloadRate} />
        <ListItem label="Up speed" title={uploadRate} alignRight />
        <ListItem label="ETA" title={eta === 0 ? '∞' : eta} />
        <ListItem label="Size" title={bytesToSize(totalSize)} alignRight />
        <ListItem label="Downloaded" title={bytesToSize(allTimeDownload)} />
        <ListItem label="Uploaded" title={bytesToSize(totalUploaded)} alignRight />
        <ListItem label="Ratio" title={formatNumber(ratio)} />
        <ListItem label="# Files" title={fileCount} alignRight />
        <ListItem label="Peers" title={formatNumber(totalPeers)} />
        <ListItem label="Seeds" title={formatNumber(totalSeeds)} alignRight />
        <ListItem label="Added on" title={timestampToFormat(timeAdded)} fullWidth />
        <ListItem label="Active time" title={timestampToRange(activeTime)} fullWidth />
      </ul>
      <FileList files={files} />
      <div>
        <span className={s.header}>Trackers</span>
        <TrackerList trackers={trackers} />
        <span className={s.header}>Peers</span>
        <PeerList peers={peers} />
      </div>
    </TabContent>
  </div>
)

export default TorrentDetails
