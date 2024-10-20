import React, { useContext } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';

import './Landing.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';

import {
    FaLinkedin,
    FaGithub,
} from 'react-icons/fa';

import { SiLeetcode, SiGeeksforgeeks, SiCodechef } from "react-icons/si";

function Landing() {
    const { theme, drawerOpen, changeTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        resumeBtn: {
            color: theme.primary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            width: '150px',
            fontSize: '1rem',
            fontWeight: '500',
            height: '50px',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid ${theme.primary}`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.tertiary,
                color: theme.secondary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                width: '180px',
            },
        },
        contactBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            width: '150px',
            height: '50px',
            fontSize: '1rem',
            fontWeight: '500',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid ${theme.primary}`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.tertiary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        themeSelect: {
            width: '150px',
            height: '40px',
            color: theme.primary,
            backgroundColor: theme.secondary,
            border: `2px solid ${theme.primary}`,
            fontFamily: 'var(--primaryFont)',
            '& .MuiSelect-icon': {
                color: theme.primary,
            },
            '& .MuiSelect-select:focus': {
                backgroundColor: 'transparent',
            },
            '& .MuiSelect-select': {
                color: theme.tertiary,
            },
        },
        menuItem: {
            color: theme.tertiary,
            backgroundColor: theme.secondary,
            '&:hover': {
                backgroundColor: theme.primary,
                color: theme.secondary,
            },
            '&.Mui-selected': {
                backgroundColor: theme.primary,
                color: theme.secondary,
            },
        },
        themeSelectContainer: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
        },
    }));

    const classes = useStyles();

    const handleThemeChange = (event) => {
        changeTheme(event.target.value);
    };

    return (
        <div className='landing'>
            
            <div className={classes.themeSelectContainer} >
                
            </div>
            <div className='landing--container'>
                <div
                    className='landing--container-left'
                    style={{ backgroundColor: theme.primary }}
                >
                    <div className='lcl--content'>
                        {socialsData.linkedIn && (
                            <a
                                href={socialsData.linkedIn}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaLinkedin
                                    className='landing--social'
                                    style={{ color: theme.secondary }}
                                    aria-label='LinkedIn'
                                />
                            </a>
                        )}
                        {socialsData.github && (
                            <a
                                href={socialsData.github}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaGithub
                                    className='landing--social'
                                    style={{ color: theme.secondary }}
                                    aria-label='GitHub'
                                />
                            </a>
                        )}
                        {socialsData.codechef && (
                            <a
                                href={socialsData.codechef}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <SiCodechef
                                    className='landing--social'
                                    style={{ color: theme.secondary }}
                                    aria-label='CodeChef'
                                />
                            </a>
                        )}
                        {socialsData.leetcode && (
                            <a
                                href={socialsData.leetcode}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <SiLeetcode
                                    className='landing--social'
                                    style={{ color: theme.secondary }}
                                    aria-label='LeetCode'
                                />
                            </a>
                        )}
                        {socialsData.geeksforgeeks && (
                            <a
                                href={socialsData.geeksforgeeks}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <SiGeeksforgeeks
                                    className='landing--social'
                                    style={{ color: theme.secondary }}
                                    aria-label='Geeks For Geeks'
                                />
                            </a>
                        )}
                    </div>
                </div>
                <img
                    src={headerData.image}
                    alt=''
                    className='landing--img'
                    style={{
                        opacity: `${drawerOpen ? '0' : '1'}`,
                        borderColor: theme.secondary,
                    }}
                />
                <div
                    className='landing--container-right'
                    style={{ backgroundColor: theme.secondary }}
                >

                    

                    <div
                        className='lcr--content'  
                        style={{ color: theme.tertiary }}
                    >
                        <h6>{headerData.title}</h6>
                        <h1>{headerData.name}</h1>
                        <p>{headerData.desciption}</p>

                        <div className='lcr-buttonContainer' >
                            {headerData.resumePdf && (
                                <a
                                    href={headerData.resumePdf}
                                    download='resume'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <Button className={classes.resumeBtn}>
                                        Download CV
                                    </Button>
                                </a>
                            )}
                            <NavLink
                                to='/#contacts'
                                smooth={true}
                                spy='true'
                                duration={2000}
                            >
                                <Button className={classes.contactBtn}>
                                    Contact
                                </Button>
                            </NavLink>
                           
                        </div>
                        <div className={classes.themeSelectContainer} id="pq">
                            {/* <p className={classes.themeLabel}>Select Theme:</p> */}
                            <Select id="ab"
                    value={theme.type}
                    onChange={handleThemeChange}
                    className={classes.themeSelect }
                    MenuProps={{
                        classes: { paper: classes.menuItem },
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}
                >
                    <MenuItem value="yellowThemeDark" className={classes.menuItem}>Yellow Dark</MenuItem>
                    <MenuItem value="yellowThemeLight" className={classes.menuItem}>Yellow Light</MenuItem>
                    <MenuItem value="blueThemeDark" className={classes.menuItem}>Blue Dark</MenuItem>
                    <MenuItem value="blueThemeLight" className={classes.menuItem}>Blue Light</MenuItem>
                    <MenuItem value="redThemeDark" className={classes.menuItem}>Red Dark</MenuItem>
                    <MenuItem value="redThemeLight" className={classes.menuItem}>Red Light</MenuItem>
                    <MenuItem value="greenThemeDark" className={classes.menuItem}>Green Dark</MenuItem>
                    <MenuItem value="greenThemeLight" className={classes.menuItem}>Green Light</MenuItem>
                    <MenuItem value="bwThemeDark" className={classes.menuItem}>Black & White Dark</MenuItem>
                    <MenuItem value="bwThemeLight" className={classes.menuItem}>Black & White Light</MenuItem>
                    <MenuItem value="orangeThemeDark" className={classes.menuItem}>Orange Dark</MenuItem>
                    <MenuItem value="orangeThemeLight" className={classes.menuItem}>Orange Light</MenuItem>
                    <MenuItem value="purpleThemeDark" className={classes.menuItem}>Purple Dark</MenuItem>
                    <MenuItem value="purpleThemeLight" className={classes.menuItem}>Purple Light</MenuItem>
                    <MenuItem value="pinkThemeDark" className={classes.menuItem}>Pink Dark</MenuItem>
                    <MenuItem value="pinkThemeLight" className={classes.menuItem}>Pink Light</MenuItem>
                </Select>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
