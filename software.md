---
layout: page
title: Software
---

All software required for courses is open source and free unless otherwise noted.
If you have any questions or problems regarding software installation, please contact
your instructor. Please see the following sections for more information on required and 
suggested software

- [Data for Data Science](#data-for-data-science): spreadsheet program (like Microsoft Excel) and a text editor (like Atom)
- [Git and GitHub](#git-and-github): GitHub Desktop App and command line tools
- [Introduction to Python](#introduction-to-python): Jupyter notebooks
- [Intermediate Python](#intermediate-python): your choice of interface
- [R](#r-and-rstudio): R and RStudio
- [SCCA employees](#scca-employees)

### Data for Data Science 

#### Spreadsheet program (e.g., Microsoft Excel)

Spreadsheet programs are a useful way for us as humans to interact with data. The most common of these is Microsoft Excel. Commands may differ a bit between programs, but the general ideas for thinking about spreadsheets are the same.
If you are working on a computer owned by Fred Hutch,
Microsoft Office (including Excel) is available through the Self Service application.
If you are working on a personal computer that doesn't have a spreadsheet program, you can use a free, open source program called LibreOffice.

* Install LibreOffice by going to the [installation page](https://www.libreoffice.org/download/download/). The version for your operating system should automatically be selected. Click Download Version X.X.X (whichever is the most recent version). You will go to a page that asks about a donation, but you don’t need to make one. Your download should begin automatically.
* Once the installer is downloaded, double click on it and LibreOffice should install.

#### Text editor

Text editors allow us to understand how computers may interact with our data. We recommend installing [Atom](https://atom.io) if you do not already have a preferred text editor (the link should auto-detect your operating system). Please note that the default text editors on most computers (Notepad on Windows and TextEdit on Mac) are not optimal for this course. 


### Git and GitHub

Git is version control software, which helps you keep track of changes made to files.
GitHub is a repository for data and code tracked with Git, and is a mechanism for publishing
and collaborating on project development.

#### GitHub Desktop App for Windows, macOS

* If you do not already have one, please register for a [GitHub](https://github.com) account.
Please note that your name and email will be publicly visible through GitHub by default,
but more information on controlling privacy settings can be found
[here](https://help.github.com/articles/setting-your-commit-email-address-on-github/).
* The website for [GitHub Desktop](https://desktop.github.com) should auto-detect your operating system
and allow you to download and install the software. If you have difficulty installing the GitHub Desktop App 
(which has been reported for some Hutch-owned PCs), 
please install the command line tools for Windows as described below.
* We recommend installing [Atom](https://atom.io) if you do not already have a preferred text editor;
this website will also auto-detect your operating system.

#### Command line tools for Windows (only for optional third week)

If you would like to work with Git on the command line in the third week of class on a Windows laptop,
also install [Git for Windows](https://gitforwindows.org). Please note that this also installs Git Gui,
which we will not use (unless you have difficulty installing the GitHub Desktop App, as described above).

#### Command line tools for macOS (only for optional third week)

If you would like to work with Git on the command line in the third week of class on a Mac laptop,
you will also need to install command line Git tools by clicking on "GitHub Desktop" in the top menu of the app,
then selecting "Install Command Line Tool." You will then be able to access the software through
Terminal, which you can locate by clicking on your Desktop, selecting "Go" in the menu at the top,
and clicking on "Utilities."


### Python

We will be using Python version 3 (and above) for our courses. 

#### Introduction to Python

We will use [Jupyter notebooks](http://jupyter.org) to record code, output, and text throughout the course, as well as the following packages (note: plotnine is the only package not installed with Anaconda: [pandas](http://pandas.pydata.org), [numpy](http://www.numpy.org), [matplotlib](https://matplotlib.org), [plotnine](https://plotnine.readthedocs.io/en/stable/) 

1. We recommend installing Python using Anaconda,
which includes most of the packages listed above, according to the following instructions:
* Download the [Anaconda](https://www.anaconda.com/download/) installer for
Python 3.x for your particular operating system.
* Double-click the downloaded file and follow the prompts to install Anaconda (default options are acceptable).
* For assistance troubleshooting installation, please go [here](https://jupyter.readthedocs.io/en/latest/install.html).

2. Following installation, open the following command line software based
on your operating system to install the final package:
* MacOSX: Terminal, locate by clicking on your Desktop, selecting "Go" in the menu at the top,
and clicking on "Utilities"
* Windows: Anaconda Prompt
* Both MacOSX and Windows: copy and paste the following code onto the
command line and execute by hitting "Enter":
`conda install -c conda-forge plotnine`


#### Intermediate Python

You are welcome to use whatever interface is most comfortable for you. Some suggestions are as follows (please see the HackMD page for your course to see what your instructor will be using):
* [Atom](https://atom.io), a text editor, which requires you to also install [Hydrogen](https://atom.io/packages/hydrogen) as well as a separate version of Python (e.g., if you've already installed Anaconda) (*preferred*)
* [Visual Studio Code](https://code.visualstudio.com), a streamlined code editor that is recommended by Scientific Computing at Fred Hutch
* [Spyder](https://www.spyder-ide.org), a scientific IDE (integrated development environment) installed with Anaconda and available in the Anaconda Navigator


### R and RStudio

R and RStudio are separate downloads.
R is the "engine", while RStudio is an integrated desktop environment (IDE) that makes using R much more pleasant.
R must be installed before RStudio.
Follow the instructions below for your operating system to install them.
If you are working on a computer owned by Fred Hutch,
RStudio + R is available through the Self Service application.

#### Windows

* Download the installer for the latest version of R from [CRAN](http://cran.r-project.org/bin/windows/base/release.htm).
  The file will begin downloading automatically.
* Double-click the downloaded `.exe` file and follow the prompts to install.
* Go to the [RStudio download page](https://www.rstudio.com/products/rstudio/download/#download).
* Under _Installers_, click the link for the _Windows Vista/7/8/10_ installer to download it.
* Double-click the downloaded `.exe` file and follow the prompts to install (default options are acceptable).
* Once both are installed, launch RStudio and make sure there are no error messages.

#### macOS

* Download the installer for the latest version of R compatible with your version of macOS from [CRAN](https://cran.r-project.org/bin/macosx/).
  If you are not using a recent version of macOS you may have to scroll down to _Binaries for legacy OS X systems_ and find the one appropriate for your version of macOS.
  To check what version of macOS you are using, click the apple icon in the upper left corner of your screen and go to _About This Mac_.
  Please note the instructions on that page for downloading and installing [XQuartz](https://www.xquartz.org/) if necessary.
* Double-click the downloaded `.pkg` file and follow the prompts to install (default options are acceptable).
* Go the the [RStudio download page](https://www.rstudio.com/products/rstudio/download/#download).
* Under _Installers_, click the link for the your OSX version's installer to download it.
* Double-click the downloaded `.dmg` file, then open the RStudio folder that appears on your desktop. Drag the RStudio icon into the Applications folder.
* Once everything is installed, launch RStudio and make sure there are no error messages.

### SCCA employees

SCCA employees cannot connect to Marconi, the main wireless network at Fred Hutch, and must use the Fred Hutch Guest network. When combined with The configuration of SCCA laptops and required remote logins, this makes it very difficult to interact with the course materials. We recommend using a personal computer for this course. If one is not available, please contact your instructor to arrange use of one of the laptops located in the Coop Lab.
