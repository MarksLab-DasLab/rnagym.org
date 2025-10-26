import './css/Home.css';
import DirectionallyAwareButton from '../misc/DirectionallyAwareButton';
function Home() {
    return (
        <div className="home-div">
            <div className="top-div">
                <div className="images-div" style={{ display: "flex", justifyContent: "center" }}>
                    <img src="/assets/RNAGym.png" style={{ width: "20%", height: "20%", height: "auto" }} />
                </div>
                <h1 style={{marginTop: "2vh", marginBottom:"4vh"}}><b>RNAGym</b></h1>
                <div className="text-div">
                    <p className="home-text"> <b>RNAGym</b> is a collection of benchmarks aiming at comparing the ability of models to predict the effects of RNA mutations on fitness, secondary structure, and tertiary structure.
                    The benchmarks in RNAGym are divided by category (fitness, 2° structure, 3° structure) and were evaluated in a zero-shot setting.</p>
                </div>
                <div className="button-outer-container">
                    <div className="fitness-button-container">
                        <h3>Fitness Benchmarks</h3>
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="fitness" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">DMS Substitutions<br/> (70 assays, 1.1M mutants)</DirectionallyAwareButton>
                    </div>
                    <div className="secondary-structure-button-container">
                        <h3>2D Structure Benchmarks</h3>
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="secondary_structure" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">Secondary Structures<br/> (4.4M sequences)</DirectionallyAwareButton>
                    </div>
                    <div className="tertiary-structure-button-container">
                        <h3>3D Structure Benchmarks</h3>
                        <DirectionallyAwareButton filled="true" pageLink="/benchmarks" viewType="aggregate" dataDomain="tertiary_structure" modelParadigm="zero_shot" sortKey="Rank-ASC" currStatistic="Spearman">Tertiary Structures<br/> (215 sequences, 66 Rfams)</DirectionallyAwareButton>
                    </div>
                </div>
            </div>
            <div className="grey-area-div top-div">
                <div className="text-div">
                    <br/>
                    <p>Find the GitHub repository for the benchmark <a href="https://github.com/MarksLab-DasLab/RNAGym">here</a> and the RNAGym paper <a href="https://www.biorxiv.org/content/10.1101/2025.06.16.660049v1">here</a>.</p>
                    <p className="home-text">Developed and maintained by: Rohit Arora, Murphy Angelo, Christian Andrew Choe, Courtney A. Shearer, Aaron W. Kollasch, Fiona Qu, Ruben Weitzman, Artem Gazizov, Sarah Gurev, Erik Xie, Debora S. Marks, and Pascal Notin</p>
                    <p className="home-text">Interested in proteins?  Please check out our sister website <a href="https://proteingym.org">ProteinGym</a>!</p>
                    <br/>
                    <center><p><b>Marks Lab</b> - Harvard Medical School</p></center>
                </div>
                <div className="images-div" style={{ display: "flex", justifyContent: "center" }}>
                    <img src="/assets/hmslogo.png" style={{ width: "60%", height: "60%" }} />
                </div>
            </div>
        </div>

    );
    }

export default Home;