import React from 'react'
import { IssuesStatistics } from '../../models/issues-statistics';
import { Commit } from '../../models/commit'
import { Issue } from '../../models/issue'
import { Contributor } from '../../models/contributor';
import ApiService from './api-service';

export class GitlabApiService extends ApiService{

  constructor() {
    const project_id: string = '16969987'
    super('https://gitlab.com/api/v4/projects/' + project_id)
  }

  getIssuesStatistics(): Promise<IssuesStatistics> {
    return this.fetchJsonAsObject<IssuesStatistics>('issues_statistics', { scope: 'all' })
  }

  getCommits(): Promise<Commit[]> {
    return this.fetchJsonAsObject<Commit[]>('repository/commits', { ref_name: 'dev', per_page: '10000', page: '0' })
  }

  getContributors(): Promise<Contributor[]> {
    return this.fetchJsonAsObject<Contributor[]>('repository/contributors', { })
  }

  getIssuesByAuthor(author_username: string): Promise<Issue[]> {
    return this.fetchJsonAsObject<Issue[]>('issues', { author_username: author_username })
  }
}

const gitlabApiService: GitlabApiService = new GitlabApiService()

const GitlabApiServiceContext = React.createContext<GitlabApiService>(gitlabApiService)

export default GitlabApiServiceContext