export const projects = [
  {
    slug: "cse-135-analytics-website",
    id: "analytics-website",
    title: "CSE 135 Analytics Website",
    image: "/assets/images/cse135.png",
    imageType: "image/png",
    imageAlt: "Table with some analytics information on a website I created for this class.",
    summary:
      "A web development coursework repository focused on building database backed website features and analytics oriented application behavior.",
    technologies: "Technologies include HTML, JavaScript, CSS, Python, database concepts, and analytics work.",
    status: "Complete",
    completion: 100,
    repository: "https://github.com/NathanNewwin/CSE135_Websites",
    repositoryLabel: "View the CSE 135 Websites repository",
    details: [
      "Connected browser-facing pages with database-backed analytics behavior.",
      "Focused on collecting, organizing, and reporting user interaction data.",
    ],
  },
  {
    slug: "flow-launcher-brave-profiles",
    id: "brave-profiles",
    title: "Flow Launcher Brave Profiles",
    image: "/assets/images/FlowLauncher.png",
    imageType: "image/png",
    imageAlt: "Example of the FlowLauncher Brave plugin open with 4 different profiles available.",
    summary:
      "A personal Flow Launcher plugin that helps open and manage Brave browser profiles from a keyboard driven workflow.",
    technologies:
      "Technologies include C#, Flow Launcher plugin development, launcher workflows, and browser profile management.",
    status: "In Development",
    completion: 80,
    repository: "https://github.com/NathanNewwin/Flow.Launcher.Plugin.BraveProfiles",
    repositoryLabel: "View the Flow Launcher plugin repository",
    featured: true,
    details: [
      "Built around quick keyboard-driven browser profile launching.",
      "Uses Flow Launcher's plugin model to show profile results and launch the selected profile.",
    ],
  },
  {
    slug: "cse-151b-spring-2026-competition",
    id: "competition-project",
    title: "CSE 151B Spring 2026 Competition",
    image: "/assets/images/cse151.png",
    imageType: "image/png",
    imageAlt: "Code for the CSE151B Spring 2026 Competition showing off the model and parameters used.",
    summary:
      "A machine learning competition submission for mathematical reasoning using Python, vLLM, model sampling, voting, and final answer repair.",
    technologies:
      "Technologies include Python, vLLM, transformers, PyTorch, Jupyter Notebook, and model inference workflows.",
    status: "Complete",
    completion: 100,
    repository: "https://github.com/NathanNewwin/151B_SP26_Competition",
    repositoryLabel: "View the CSE 151B competition repository",
    featured: true,
    details: [
      "Combined model sampling with voting to improve final answer reliability.",
      "Used answer repair logic to normalize mathematical reasoning outputs.",
    ],
  },
  {
    slug: "cse-110-group-19",
    id: "cse-110-group",
    title: "CSE 110 Group 19",
    image: "/assets/images/cse110.png",
    imageType: "image/png",
    imageAlt: "Preview of the CSE 110 matching game home screen.",
    summary:
      "A team software engineering project from CSE 110 focused on planning, collaboration, implementation, and delivery as part of a group development process.",
    technologies: "Technologies include team workflows, web development, documentation, and software design.",
    status: "Complete",
    completion: 100,
    repository: "https://github.com/NathanNewwin/cse110-sp25-group19",
    repositoryLabel: "View the CSE 110 Group 19 repository",
    details: [
      "Worked through a team software process with planning, implementation, and review.",
      "Built a matching game experience with shared ownership across roles.",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
