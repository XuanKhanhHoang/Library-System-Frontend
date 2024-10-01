import "./test/style.css";
import "./test/a.css";
export default function Home() {
  return (
    <body id="page-top" className="">
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <h4>Libr/ary Management System</h4>

        <button
          className="btn btn-link btn-sm text-white order-1 order-sm-0"
          id="sidebarToggle"
        >
          <i className="fas fa-bars"></i>
        </button>

        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <span>Welcome, Admin</span>
        </form>

        {/* <!-- Navbar --> */}
        <ul className="navbar-nav ml-auto ml-md-0">
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="change-password.php">
                Change Password
              </a>
              <a className="dropdown-item" href="logout.php">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="dashboard.php">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="pagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-book"></i>
              <span>Manage Books</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <a className="dropdown-item" href="add-book.php">
                Add Book
              </a>
              <a className="dropdown-item" href="view-book.php">
                View Book
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="pagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-list-alt"></i>
              <span>Manage Category</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <a className="dropdown-item" href="add-category.php">
                Add Category
              </a>
              <a className="dropdown-item" href="view-category.php">
                View Category
              </a>
            </div>
          </li>
          <li className="nav-item ">
            <a className="nav-link " href="issue-request.php">
              <i className="fa fa-paper-plane"></i>
              <span>Book Issue Requests</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="pagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-map-marker"></i>
              <span>Manage Place</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <a className="dropdown-item" href="add-place.php">
                Add Place
              </a>
              <a className="dropdown-item" href="view-place.php">
                View Place
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="pagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-user"></i>
              <span>Manage Users</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <a className="dropdown-item" href="add-users.php">
                Add Users
              </a>
              <a className="dropdown-item" href="view-users.php">
                View Users
              </a>
            </div>
          </li>
        </ul>{" "}
        <div id="content-wrapper">
          <div className="container-fluid">
            <ol className="br/eadcrumb">
              <li className="br/eadcrumb-item">
                <a>Dashboard</a>
              </li>
            </ol>
            <div className="row">
              <div className="col-sm-4">
                <section className="panel panel-featured-left panel-featured-primary">
                  <div className="panel-body total">
                    <div className="widget-summary">
                      <div className="widget-summary-col widget-summary-col-icon">
                        <div className="summary-icon bg-secondary">
                          <i className="fa fa-book"></i>
                        </div>
                      </div>
                      <div className="widget-summary-col">
                        <div className="summary">
                          <h4 className="title">Total Books</h4>
                          <div className="info">
                            <strong className="amount">0</strong>
                            <br />
                          </div>
                        </div>
                        <div className="summary-footer">
                          <a className="text-muted text-uppercase"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-sm-4">
                <section className="panel panel-featured-left panel-featured-primary">
                  <div className="panel-body available">
                    <div className="widget-summary">
                      <div className="widget-summary-col widget-summary-col-icon">
                        <div className="summary-icon bg-secondary">
                          <i className="fa fa-book"></i>
                        </div>
                      </div>
                      <div className="widget-summary-col">
                        <div className="summary">
                          <h4 className="title">Available Books</h4>
                          <div className="info">
                            <strong className="amount">0</strong>
                            <br />
                          </div>
                        </div>
                        <div className="summary-footer">
                          <a className="text-muted text-uppercase"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-sm-4">
                <section className="panel panel-featured-left panel-featured-primary">
                  <div className="panel-body issued">
                    <div className="widget-summary">
                      <div className="widget-summary-col widget-summary-col-icon">
                        <div className="summary-icon bg-secondary">
                          <i className="fa fa-book"></i>
                        </div>
                      </div>
                      <div className="widget-summary-col">
                        <div className="summary">
                          <h4 className="title">Issued Books</h4>
                          <div className="info">
                            <strong className="amount">0</strong>
                            <br />
                          </div>
                        </div>
                        <div className="summary-footer">
                          <a className="text-muted text-uppercase"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-sm-4">
                <section className="panel panel-featured-left panel-featured-primary">
                  <div className="panel-body returned">
                    <div className="widget-summary">
                      <div className="widget-summary-col widget-summary-col-icon">
                        <div className="summary-icon bg-secondary">
                          <i className="fa fa-book"></i>
                        </div>
                      </div>
                      <div className="widget-summary-col">
                        <div className="summary">
                          <h4 className="title">Returned Books</h4>
                          <div className="info">
                            <strong className="amount">0</strong>
                            <br />
                          </div>
                        </div>
                        <div className="summary-footer">
                          <a className="text-muted text-uppercase"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-sm-4">
                <section className="panel panel-featured-left panel-featured-primary">
                  <div className="panel-body user">
                    <div className="widget-summary">
                      <div className="widget-summary-col widget-summary-col-icon">
                        <div className="summary-icon bg-secondary">
                          <i className="fa fa-user"></i>
                        </div>
                      </div>
                      <div className="widget-summary-col">
                        <div className="summary">
                          <h4 className="title">Total User</h4>
                          <div className="info">
                            <strong className="amount">2</strong>
                            <br />
                          </div>
                        </div>
                        <div className="summary-footer">
                          <a className="text-muted text-uppercase"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </body>
  );
}
