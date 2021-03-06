import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import GitlabApiServiceContext, {
  GitlabApiService,
} from "../../common/services/GitlabApiService";
import { Commit } from "../../models/Commit";

type MemberProps = {
  img: string;
  name: string;
  role: string;
  bio: string;
  author_name: string[];
  gitlab_id: string;
  tests: number;
};
type MemberState = { commitCount: number; issueCount: number };

export class Member extends React.Component<MemberProps, MemberState> {
  static contextType = GitlabApiServiceContext;

  constructor(props: any) {
    super(props);
    this.state = {
      commitCount: 0,
      issueCount: 0,
    };
  }

  componentDidMount() {
    const gitlabApiService: GitlabApiService = this.context;
    gitlabApiService.getAllCommits().then((res) => this.countCommits(res));

    gitlabApiService
      .getIssuesByAssignee(this.props.gitlab_id)
      .then((res) => this.setState({ issueCount: res.length }));
  }

  countCommits(commits: Commit[]) {
    let count: number = commits.filter(
      (commit) =>
        this.props.author_name.some((name) => name === commit.author_name) &&
        !commit.title.toLowerCase().includes("merge branch")
    ).length;

    this.setState({ commitCount: count });
  }

  render() {
    return (
      <div className="member">
        <svg className="svg-1">
          <rect className="top-rect" width="1" height="1"></rect>
        </svg>
        <svg className="svg-2">
          <rect className="bottom-rect" width="1" height="1"></rect>
        </svg>

        <img
          src={this.props.img}
          alt={"A headshot of " + this.props.name}
        ></img>
        <div className="member-text">
          <h4>{this.props.name}</h4>
          <p>{this.props.role}</p>
        </div>

        <div className="door">
          <div className="text">{this.props.bio}</div>
        </div>

        <div className="circles">
          <div className="circle" title="No. Commits">
            {this.state.commitCount}
          </div>
          <div className="circle" title="No. Issues">
            {this.state.issueCount}
          </div>
          <div className="circle" title="No. Unit Tests">
            {this.props.tests}
          </div>
        </div>

        <div className="icons">
          <FontAwesomeIcon
            className="icon"
            icon={faCodeBranch}
            color="#528C8B"
            size="1x"
          />
          <FontAwesomeIcon
            className="icon"
            icon={faExclamationCircle}
            color="#528C8B"
            size="1x"
          />
          <FontAwesomeIcon
            className="icon"
            icon={faFlask}
            color="#528C8B"
            size="1x"
          />
        </div>
      </div>
    );
  }
}
