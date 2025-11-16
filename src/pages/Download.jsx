// Page to download proteingym data (placeholder text for now)

import React from 'react';
import { Button } from '@mantine/core';
import './css/Download.css';
function Download() {
    return (
        <div className="download-div">
            <h2>Data</h2>
            <div className="button-group">
                <div className="header-buttons">
                    <h3>Fitness</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/rnagym/fitness_prediction/fitness_processed_assays.zip"><Button className="indiv_button">Processed assay data</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/fitness_prediction/fitness_raw_data.zip"><Button className="indiv_button">Raw assay data</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/fitness_prediction/model_predictions.zip"><Button className="indiv_button">Model predictions</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/fitness_prediction/fitness_MSAs.zip"><Button className="indiv_button">Alignments</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/fitness_prediction/fitness_assays_3D_structures.zip"><Button className="indiv_button">3D structures</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/fitness_prediction/fitness_CV_splits.zip"><Button className="indiv_button">CV splits (supervised)</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>2D Structure</h3>
                    <div className="data-download-button">
                        <a href="https://marks.hms.harvard.edu/rnagym/structure_prediction/test_data.zip"><Button className="indiv_button">Processed eval data</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/structure_prediction/raw_data.zip"><Button className="indiv_button">Raw assay data</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/structure_prediction/model_predictions.zip"><Button className="indiv_button">Model predictions</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/structure_prediction/models.zip"><Button className="indiv_button">Model files</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/structure_prediction/train_data.zip"><Button className="indiv_button">Training data (supervised)</Button></a>
                        <a href="https://marks.hms.harvard.edu/rnagym/structure_prediction/test_sequences_annotated.zip"><Button className="indiv_button">Additional annotations (PDB, Rfam, PseudoBase)</Button></a>
                    </div>
                </div>
                <div className="header-buttons">
                    <h3>3D Structure</h3>
                    <a href="https://github.com/MarksLab-DasLab/RNAGym/tree/main/3d"><Button className="indiv_button">Train/test splits</Button></a>
                    <a href="https://marks.hms.harvard.edu/rnagym/tertiary_structure_prediction/3D_alignments.tar.xz"><Button className="indiv_button">Alignments</Button></a>
                    <a href="https://marks.hms.harvard.edu/rnagym/tertiary_structure_prediction/monomer.csv"><Button className="indiv_button">Monomer scores</Button></a>
                    <a href="https://marks.hms.harvard.edu/rnagym/tertiary_structure_prediction/multimer.csv"><Button className="indiv_button">Complex scores</Button></a>
                    <a href="https://marks.hms.harvard.edu/rnagym/tertiary_structure_prediction/3D_model_outputs.tar.xz"><Button className="indiv_button">Model predictions (PDBs)</Button></a>
                    <a href="https://marks.hms.harvard.edu/rnagym/tertiary_structure_prediction/3D_train_to_test_usalign.tar.xz"><Button className="indiv_button">Test-to-train TM scores</Button></a>
                </div>
            </div>
            <br/>
            <h3>Additional Links</h3>
            <div className="data-download-button">
                <a href="https://www.biorxiv.org/content/10.1101/2025.06.16.660049v1"><Button className="lone_button">Paper</Button></a>
                <a href="https://github.com/MarksLab-DasLab/RNAGym"><Button className="lone_button">Github Repository</Button></a>
            </div>
            <div className="data-download-button">

            </div>
        </div>
    );
    }
    
export default Download;
