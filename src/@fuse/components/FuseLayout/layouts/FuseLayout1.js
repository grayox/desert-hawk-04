import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'store/actions';
import { AppBar, Hidden, Icon, IconButton, Drawer, MuiThemeProvider } from '@material-ui/core'; // Toolbar,
import { FuseScrollbars, FuseMessage, FuseThemes, FuseDialog } from '@fuse';
import classNames from 'classnames';
import _ from '@lodash';

// begin my add
import MyAppBar from 'app/layouts/appBars/MyAppBar';
// end my add

const defaultProps = {};

const navbarWidth = 280;

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '&.boxed': {
      maxWidth: 1280,
      margin: '0 auto',
      boxShadow: theme.shadows[3]
    },
    '& table.simple tbody tr td': {
      borderColor: theme.palette.divider
    },
    '& table.simple thead tr th': {
      borderColor: theme.palette.divider
    },
    '& a:not([role=button])': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '& [class^="border-"]': {
      borderColor: theme.palette.divider
    },
    '& [class*="border-"]': {
      borderColor: theme.palette.divider
    },
    '&.scroll-body': {
      '& $wrapper': {
        height: 'auto',
        flex: '0 0 auto',
        overflow: 'auto'
      },
      '& $contentWrapper': {},
      '& $content': {}
    },
    '&.scroll-content': {
      '& $wrapper': {},
      '& $contentWrapper': {},
      '& $content': {}
    }
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 3,
    overflow: 'hidden',
    flex: '1 1 auto'
  },
  content: {
    // padding: '32px 0', // my add
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    '-webkit-overflow-scrolling': 'touch'
  },
  navbarWrapper: {
    zIndex: 4,
    [theme.breakpoints.up('lg')]: {
      width: navbarWidth,
      minWidth: navbarWidth
    }
  },
  navbarPaperWrapper: {},
  navbar: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    width: navbarWidth,
    minWidth: navbarWidth,
    height: '100%',
    zIndex: 4,
    transition: theme.transitions.create(['width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    boxShadow: theme.shadows[3]
  },
  navbarButton: {
    '&.right': {
      borderLeft: '1px solid ' + theme.palette.divider
    },
    '&.left': {
      borderRight: '1px solid ' + theme.palette.divider
    }
  },
  navbarLeft: {
    left: 0
  },
  navbarRight: {
    right: 0
  },
  navbarWrapperFolded: {
    [theme.breakpoints.up('lg')]: {
      width: 64,
      minWidth: 64
    }
  },
  navbarFolded: {
    position: 'absolute',
    width: 64,
    minWidth: 64,
    top: 0,
    bottom: 0
  },
  navbarFoldedOpen: {
    width: navbarWidth,
    minWidth: navbarWidth
  },
  navbarFoldedClose: {
    '& $navbarHeader': {
      '& .logo-icon': {
        width: 32,
        height: 32
      },
      '& .logo-text': {
        opacity: 0
      },
      '& .react-badge': {
        opacity: 0
      }
    },
    '& .list-item-text, & .arrow-icon': {
      opacity: 0
    },
    '& .list-subheader .list-subheader-text': {
      opacity: 0
    },
    '& .list-subheader:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      minWidth: 16,
      borderTop: '2px solid',
      opacity: .2
    },
    '& .collapse-children': {
      display: 'none'
    },
    '& .user': {
      '& .username, & .email': {
        opacity: 0
      },
      '& .avatar': {
        width: 40,
        height: 40,
        top: 32,
        padding: 0
      }
    },
    '& .list-item.active': {
      marginLeft: 12,
      width: 40,
      padding: 12,
      borderRadius: 20,
      '&.square': {
        borderRadius: 0,
        marginLeft: 0,
        paddingLeft: 24,
        width: '100%'
      }
    }
  },
  navbarHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 1 auto',
    flexDirection: 'row',
    height: 64,
    minHeight: 64
  },
  navbarHeader: {
    display: 'flex',
    flex: '1 0 auto',
    padding: '0 8px 0 16px'
  },
  navbarContent: {
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    background: 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll'
  },
  toolbarWrapper: {
    display: 'flex',
    position: 'relative',
    zIndex: 5
  },
  toolbar: {
    display: 'flex',
    flex: '1 0 auto'
  },
  footerWrapper: {
    position: 'relative',
    zIndex: 5
  },
  footer: {
    display: 'flex',
    flex: '1 0 auto'
  }

});

class FuseLayout1 extends Component {

  handleToggleFolded = () => {
    this.props.setDefaultSettings(_.set({}, 'layout.config.navbar.folded', !this.props.settings.layout.config.navbar.folded));
  };

  render() {
    const {
      classes, toolbar, footer, settings,
      navbar, navbarOpenMobile, navbarCloseMobile,
      navbarHeader, navbarContent, navbarOpenFolded, navbarCloseFolded,
      children, leftSidePanel, rightSidePanel, contentWrapper
    } = this.props;
    // console.warn('FuseLayout:: rendered');
    const layoutConfig = settings.layout.config;

    const navbarHeaderIconButton = (
      <React.Fragment>
        <div className={classes.navbarHeader}>
          {navbarHeader}
        </div>
        {/* laptop: none */}
        {/* tablet */}
        <Hidden xsDown lgUp>
          <IconButton onClick={this.handleToggleFolded} color="inherit"><Icon>chevron_left</Icon></IconButton>
        </Hidden>
        {/* mobile */}
        <Hidden smUp>
          <IconButton onClick={navbarCloseMobile} color="inherit"><Icon>chevron_left</Icon></IconButton>
        </Hidden>
      </React.Fragment>
    );
    
    const navbarHeaderTemplate = (
      <React.Fragment>
        {/* laptop */}
        <Hidden mdDown>
          <AppBar
            color="primary"
            position="static"
            elevation={0}
            className={classes.navbarHeaderWrapper}
            // onClick={this.handleToggleFolded}
          >
          </AppBar>
        </Hidden>
        {/* tablet */}
        <Hidden xsDown lgUp>
          <AppBar
            color="primary"
            position="static"
            elevation={0}
            className={classes.navbarHeaderWrapper}
            onClick={this.handleToggleFolded}
          >
          </AppBar>
        </Hidden>
        {/* mobile */}
        <Hidden smUp>
          <AppBar
            color="primary"
            position="static"
            elevation={0}
            className={classes.navbarHeaderWrapper}
            onClick={this.handleToggleFolded}
          >
          </AppBar>
        </Hidden>
        {navbarHeaderIconButton}
      </React.Fragment>
    );

    const navbarContentTemplate = (
      <FuseScrollbars className={classes.navbarContent}>
        {navbarContent}
      </FuseScrollbars>
    );

    const navBarTemplate = (
      <MuiThemeProvider theme={FuseThemes[settings.theme.navbar]}>
        <div id="fuse-navbar"
          className={classNames(
            classes.navbarWrapper,
            layoutConfig.navbar.folded && classes.navbarWrapperFolded)}
        >
          {/* tablet, laptop */}
          <Hidden xsDown>
            <div
              className={classNames(
                classes.navbar,
                classes['navbar' + _.upperFirst(layoutConfig.navbar.position)],
                layoutConfig.navbar.folded && classes.navbarFolded,
                layoutConfig.navbar.folded && navbar.foldedOpen && classes.navbarFoldedOpen,
                layoutConfig.navbar.folded && !navbar.foldedOpen && classes.navbarFoldedClose)}
              onMouseEnter={() => layoutConfig.navbar.folded && !navbar.foldedOpen && navbarOpenFolded()}
              onMouseLeave={() => layoutConfig.navbar.folded && navbar.foldedOpen && navbarCloseFolded()}
              style={{ backgroundColor: FuseThemes[settings.theme.navbar].palette.background.default }}
            >
              {navbarHeaderTemplate}
              {navbarContentTemplate}
            </div>
          </Hidden>
          {/* mobile */}
          <Hidden smUp>
            <Drawer
              anchor={layoutConfig.navbar.position}
              variant="temporary"
              open={navbar.mobileOpen}
              classes={{
                paper: classes.navbar
              }}
              onClose={navbarCloseMobile}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {navbarHeaderTemplate}
              {navbarContentTemplate}
            </Drawer>
          </Hidden>
        </div>
      </MuiThemeProvider>
    );

    // const toolbarTemplate = null;
    const toolbarTemplate = (
      <MuiThemeProvider theme={FuseThemes[settings.theme.toolbar]}>
        <MyAppBar
          id="fuse-toolbar"
          className={classNames(classes.toolbarWrapper, classes.toolbar,)}
          color="default"
          onClick={navbarOpenMobile}
        />
      </MuiThemeProvider>
    );
    // const toolbarTemplate = (
    //   <MuiThemeProvider theme={FuseThemes[settings.theme.toolbar]}>
    //     <AppBar id="fuse-toolbar" className={classNames(classes.toolbarWrapper)} color="default">
    //       <Toolbar className="p-0">
    //         {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
    //           <Hidden lgUp>
    //             <IconButton
    //               className={classNames(classes.navbarButton, 'w-64 h-64 rounded-none', layoutConfig.navbar.position)}
    //               aria-label="open drawer"
    //               onClick={navbarOpenMobile}
    //             >
    //               <Icon>arrow_back</Icon>
    //               {/* <Icon>menu</Icon> */}
    //             </IconButton>
    //           </Hidden>
    //         )}
    //         <div className={classes.toolbar}>
    //           {toolbar}
    //         </div>
    //         {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
    //           <Hidden lgUp>
    //             <IconButton
    //               className={classNames(classes.navbarButton, 'w-64 h-64 rounded-none', layoutConfig.navbar.position)}
    //               aria-label="open drawer"
    //               onClick={navbarOpenMobile}
    //             >
    //               <Icon>menu</Icon>
    //               {/* <Icon>menu</Icon> */}
    //             </IconButton>
    //           </Hidden>
    //         )}
    //       </Toolbar>
    //     </AppBar>
    //   </MuiThemeProvider>
    // );

    // const footerTemplate = footer;
    const footerTemplate = (
      <MuiThemeProvider theme={FuseThemes[settings.theme.footer]}>
        <AppBar id="fuse-footer" className={classNames(classes.footerWrapper, "md:hidden")}
          // color="default"
          color="white"
        >
          {footer}
        </AppBar>
      </MuiThemeProvider>
    );
    // const footerTemplate = (
    //   <MuiThemeProvider theme={FuseThemes[settings.theme.footer]}>
    //     <AppBar id="fuse-footer" className={classNames(classes.footerWrapper, "md:hidden",)} 
    //       // color="default"
    //       color="white"
    //       >
    //       <Toolbar className="p-0">
    //         <div className={classNames(classes.footer)}>
    //           {footer}
    //         </div>
    //       </Toolbar>
    //     </AppBar>
    //   </MuiThemeProvider>
    // );

    switch (layoutConfig.scroll) {
      case 'body':
        {
          return (
            <div id="fuse-layout" className={classNames(classes.root, layoutConfig.mode, 'scroll-' + layoutConfig.scroll)}>

              {layoutConfig.leftSidePanel.display && (
                leftSidePanel
              )}

              <div className="flex flex-1 flex-col overflow-hidden relative">

                {toolbar && layoutConfig.toolbar.display && layoutConfig.toolbar.style === 'fixed' && layoutConfig.toolbar.position === 'above' && (
                  toolbarTemplate
                )}

                <FuseScrollbars className="overflow-auto">

                  {toolbar && layoutConfig.toolbar.display && layoutConfig.toolbar.style !== 'fixed' && layoutConfig.toolbar.position === 'above' && (
                    toolbarTemplate
                  )}

                  <div className={classes.wrapper}>

                    {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                      navBarTemplate
                    )}

                    <div className={classes.contentWrapper}>

                      {toolbar && layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && (
                        toolbarTemplate
                      )}

                      <div className={classes.content}>
                        <FuseDialog />
                        {renderRoutes(this.props.routes)}
                        {children}
                      </div>

                      {footer && layoutConfig.footer.display && layoutConfig.footer.position === 'below' && (
                        footerTemplate
                      )}

                      {contentWrapper}

                    </div>

                    {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
                      navBarTemplate
                    )}
                  </div>

                  {footer && layoutConfig.footer.display && layoutConfig.footer.style !== 'fixed' && layoutConfig.footer.position === 'above' && (
                    footerTemplate
                  )}

                </FuseScrollbars>

                {footer && layoutConfig.footer.display && layoutConfig.footer.style === 'fixed' && layoutConfig.footer.position === 'above' && (
                  footerTemplate
                )}

              </div>

              {layoutConfig.rightSidePanel.display && (
                rightSidePanel
              )}

              <FuseMessage />
            </div>
          );
        }
      case 'content':
      default:
        {
          return (
            <div id="fuse-layout" className={classNames(classes.root, layoutConfig.mode, 'scroll-' + layoutConfig.scroll)}>

              {layoutConfig.leftSidePanel.display && (
                leftSidePanel
              )}

              <div className="flex flex-1 flex-col overflow-hidden relative">

                {toolbar && layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'above' && (
                  toolbarTemplate
                )}

                <div className={classes.wrapper}>

                  {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                    navBarTemplate
                  )}

                  <div className={classes.contentWrapper}>
                    {toolbar && layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && layoutConfig.toolbar.style === 'fixed' && (
                      toolbarTemplate
                    )}

                    <FuseScrollbars className={classes.content}>
                      {toolbar && layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && layoutConfig.toolbar.style !== 'fixed' && (
                        toolbarTemplate
                      )}

                      <FuseDialog />

                      {renderRoutes(this.props.routes)}
                      {children}

                      {footer && layoutConfig.footer.display && layoutConfig.footer.position === 'below' && layoutConfig.footer.style !== 'fixed' && (
                        footerTemplate
                      )}
                    </FuseScrollbars>

                    {footer && layoutConfig.footer.display && layoutConfig.footer.position === 'below' && layoutConfig.footer.style === 'fixed' && (
                      footerTemplate
                    )}

                    {contentWrapper}
                  </div>

                  {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
                    navBarTemplate
                  )}
                </div>

                {footer && layoutConfig.footer.display && layoutConfig.footer.position === 'above' && (
                  footerTemplate
                )}
              </div>

              {layoutConfig.rightSidePanel.display && (
                rightSidePanel
              )}

              <FuseMessage />
            </div>
          );
        }
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSettings: Actions.setSettings,
    setDefaultSettings: Actions.setDefaultSettings,
    resetSettings: Actions.resetSettings,
    navbarOpenFolded: Actions.navbarOpenFolded,
    navbarCloseFolded: Actions.navbarCloseFolded,
    navbarOpenMobile: Actions.navbarOpenMobile,
    navbarCloseMobile: Actions.navbarCloseMobile
  }, dispatch);
}

function mapStateToProps({ fuse }) {
  return {
    defaultSettings: fuse.settings.defaults,
    settings: fuse.settings.current,
    navbar: fuse.navbar
  }
}

FuseLayout1.defaultProps = defaultProps;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseLayout1)));
