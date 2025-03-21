
    document.addEventListener('DOMContentLoaded', function() {
        // Variáveis para armazenar os dados do currículo
        let experiences = [];
        let educations = [];
        let skills = [];
        let languages = [];
        let currentTheme = 'default';

        // Event Listeners para adicionar itens
        document.getElementById('add-experience').addEventListener('click', addExperience);
        document.getElementById('add-education').addEventListener('click', addEducation);
        document.getElementById('add-skill').addEventListener('click', addSkill);
        document.getElementById('add-language').addEventListener('click', addLanguage);
        document.getElementById('generate-cv').addEventListener('click', generateCV);
        document.getElementById('print-cv').addEventListener('click', printCV);
        document.getElementById('save-cv').addEventListener('click', saveAsPDF);
        document.getElementById('copy-html').addEventListener('click', copyHTML);

        // Event Listeners para botões de tema
        document.querySelectorAll('.theme-btn').forEach(button => {
            button.addEventListener('click', function() {
                currentTheme = this.dataset.theme;
                applyTheme();
                generateCV();
            });
        });

        // Funções para adicionar itens
        function addExperience() {
            const company = document.getElementById('exp-company').value.trim();
            const position = document.getElementById('exp-position').value.trim();
            const period = document.getElementById('exp-period').value.trim();
            const description = document.getElementById('exp-description').value.trim();
            
            if (company && position) {
                experiences.push({ company, position, period, description });
                renderExperiencesList();
                clearExperienceForm();
            }
        }
        
        function addEducation() {
            const institution = document.getElementById('edu-institution').value.trim();
            const degree = document.getElementById('edu-degree').value.trim();
            const period = document.getElementById('edu-period').value.trim();
            const description = document.getElementById('edu-description').value.trim();
            
            if (institution && degree) {
                educations.push({ institution, degree, period, description });
                renderEducationList();
                clearEducationForm();
            }
        }
        
        function addSkill() {
            const skill = document.getElementById('skill-name').value.trim();
            
            if (skill) {
                skills.push(skill);
                renderSkillsList();
                document.getElementById('skill-name').value = '';
            }
        }
        
        function addLanguage() {
            const name = document.getElementById('language-name').value.trim();
            const level = document.getElementById('language-level').value.trim();
            
            if (name && level) {
                languages.push({ name, level });
                renderLanguagesList();
                document.getElementById('language-name').value = '';
                document.getElementById('language-level').value = '';
            }
        }
        
        // Funções para renderizar listas
        function renderExperiencesList() {
            const list = document.getElementById('experiences-list');
            list.innerHTML = '';
            
            experiences.forEach((exp, index) => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <strong>${exp.position}</strong> em ${exp.company}<br>
                    <small>${exp.period}</small>
                    <button class="remove-btn" data-index="${index}">×</button>
                `;
                list.appendChild(item);
            });
            
            // Adicionar listeners aos botões de remover
            list.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    experiences.splice(this.dataset.index, 1);
                    renderExperiencesList();
                });
            });
        }
        
        function renderEducationList() {
            const list = document.getElementById('education-list');
            list.innerHTML = '';
            
            educations.forEach((edu, index) => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <strong>${edu.degree}</strong> - ${edu.institution}<br>
                    <small>${edu.period}</small>
                    <button class="remove-btn" data-index="${index}">×</button>
                `;
                list.appendChild(item);
            });
            
            list.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    educations.splice(this.dataset.index, 1);
                    renderEducationList();
                });
            });
        }
        
        function renderSkillsList() {
            const list = document.getElementById('skills-list');
            list.innerHTML = '';
            
            skills.forEach((skill, index) => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    ${skill}
                    <button class="remove-btn" data-index="${index}">×</button>
                `;
                list.appendChild(item);
            });
            
            list.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    skills.splice(this.dataset.index, 1);
                    renderSkillsList();
                });
            });
        }
        
        function renderLanguagesList() {
            const list = document.getElementById('languages-list');
            list.innerHTML = '';
            
            languages.forEach((lang, index) => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <strong>${lang.name}</strong> - ${lang.level}
                    <button class="remove-btn" data-index="${index}">×</button>
                `;
                list.appendChild(item);
            });
            
            list.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    languages.splice(this.dataset.index, 1);
                    renderLanguagesList();
                });
            });
        }
        
        // Função para limpar formulários
        function clearExperienceForm() {
            document.getElementById('exp-company').value = '';
            document.getElementById('exp-position').value = '';
            document.getElementById('exp-period').value = '';
            document.getElementById('exp-description').value = '';
        }
        
        function clearEducationForm() {
            document.getElementById('edu-institution').value = '';
            document.getElementById('edu-degree').value = '';
            document.getElementById('edu-period').value = '';
            document.getElementById('edu-description').value = '';
        }
        
        // Aplicar tema ao currículo
        function applyTheme() {
            const cvPreview = document.getElementById('cv-preview');
            
            // Remover temas anteriores
            cvPreview.classList.remove('theme-modern', 'theme-elegant', 'theme-creative');
            
            // Aplicar novo tema
            if (currentTheme !== 'default') {
                cvPreview.classList.add(`theme-${currentTheme}`);
            }
        }
        
        // Gerar visualização do currículo
        function generateCV() {
            const name = document.getElementById('name').value || '[Seu Nome]';
            const title = document.getElementById('title').value || '[Seu Título]';
            const email = document.getElementById('email').value || '[Email]';
            const phone = document.getElementById('phone').value || '[Telefone]';
            const location = document.getElementById('location').value || '[Localização]';
            const linkedin = document.getElementById('linkedin').value;
            const summary = document.getElementById('summary').value || '[Resumo]';
            
            let cvHTML = `
                <div class="cv-header">
                    <div class="cv-name">${name}</div>
                    <div class="cv-title">${title}</div>
                    <div class="cv-contact">
                        ${email} | ${phone} | ${location}
                        ${linkedin ? ' | ' + linkedin : ''}
                    </div>
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Perfil Profissional</div>
                    <div>${summary}</div>
                </div>
            `;
            
            // Adicionar experiências
            if (experiences.length > 0) {
                cvHTML += `
                    <div class="cv-section">
                        <div class="cv-section-title">Experiência Profissional</div>
                `;
                
                experiences.forEach(exp => {
                    cvHTML += `
                        <div class="cv-item">
                            <div class="cv-item-title">${exp.position}</div>
                            <div class="cv-item-subtitle">${exp.company}</div>
                            <div class="cv-item-period">${exp.period}</div>
                            <div>${exp.description}</div>
                        </div>
                    `;
                });
                
                cvHTML += `</div>`;
            }
            
            // Adicionar educação
            if (educations.length > 0) {
                cvHTML += `
                    <div class="cv-section">
                        <div class="cv-section-title">Formação Acadêmica</div>
                `;
                
                educations.forEach(edu => {
                    cvHTML += `
                        <div class="cv-item">
                            <div class="cv-item-title">${edu.degree}</div>
                            <div class="cv-item-subtitle">${edu.institution}</div>
                            <div class="cv-item-period">${edu.period}</div>
                            ${edu.description ? `<div>${edu.description}</div>` : ''}
                        </div>
                    `;
                });
                
                cvHTML += `</div>`;
            }
            
            // Adicionar habilidades
            if (skills.length > 0) {
                cvHTML += `
                    <div class="cv-section">
                        <div class="cv-section-title">Habilidades</div>
                        <div>${skills.join(', ')}</div>
                    </div>
                `;
            }
            
            // Adicionar idiomas
            if (languages.length > 0) {
                cvHTML += `
                    <div class="cv-section">
                        <div class="cv-section-title">Idiomas</div>
                `;
                
                languages.forEach(lang => {
                    cvHTML += `<div>${lang.name}: ${lang.level}</div>`;
                });
                
                cvHTML += `</div>`;
            }
            
            document.getElementById('cv-preview').innerHTML = cvHTML;
        }
        
        // Funções para ações de CV
        function printCV() {
            const cvContent = document.getElementById('cv-preview').innerHTML;
            const printWindow = window.open('', '_blank');
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Currículo - ${document.getElementById('name').value || 'Sem Nome'}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            padding: 20px;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        
                        .cv-header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        
                        .cv-name {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 5px;
                        }
                        
                        .cv-section {
                            margin-bottom: 20px;
                        }
                        
                        .cv-section-title {
                            font-size: 18px;
                            font-weight: bold;
                            border-bottom: 2px solid #4CAF50;
                            padding-bottom: 5px;
                            margin-bottom: 10px;
                        }
                        
                        .cv-item {
                            margin-bottom: 15px;
                        }
                        
                        .cv-item-title {
                            font-weight: bold;
                        }
                        
                        .cv-item-subtitle {
                            font-style: italic;
                            color: #555;
                        }
                        
                        .cv-item-period {
                            color: #777;
                        }
                        
                        /* Aplicar tema */
                        ${getThemeCSS()}
                    </style>
                </head>
                <body class="cv theme-${currentTheme}">
                    ${cvContent}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }
        
        function saveAsPDF() {
            alert("Para salvar como PDF, utilize a função de imprimir e escolha 'Salvar como PDF' nas opções de impressora.");
            printCV();
        }
        
        function copyHTML() {
            const cvContent = document.getElementById('cv-preview').innerHTML;
            
            // Criar HTML completo para copiar
            const htmlToCopy = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Meu Currículo</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    
                    .cv-header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    
                    .cv-name {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    
                    .cv-section {
                        margin-bottom: 20px;
                    }
                    
                    .cv-section-title {
                        font-size: 18px;
                        font-weight: bold;
                        border-bottom: 2px solid #4CAF50;
                        padding-bottom: 5px;
                        margin-bottom: 10px;
                    }
                    
                    .cv-item {
                        margin-bottom: 15px;
                    }
                    
                    .cv-item-title {
                        font-weight: bold;
                    }
                    
                    .cv-item-subtitle {
                        font-style: italic;
                        color: #555;
                    }
                    
                    .cv-item-period {
                        color: #777;
                    }
                    
                    /* Tema aplicado */
                    ${getThemeCSS()}
                </style>
            </head>
            <body class="cv theme-${currentTheme}">
                ${cvContent}
            </body>
            </html>
            `;
            
            // Criar um elemento temporário para copiar texto
            const tempElement = document.createElement('textarea');
            tempElement.value = htmlToCopy;
            document.body.appendChild(tempElement);
            tempElement.select();
            document.execCommand('copy');
            document.body.removeChild(tempElement);
            
            alert('HTML copiado para a área de transferência!');
        }
        
        // Função para obter CSS do tema atual
        function getThemeCSS() {
            switch(currentTheme) {
                case 'modern':
                    return `
                        .theme-modern .cv-section-title {
                            border-bottom: none;
                            color: #2196F3;
                        }
                    `;
                case 'elegant':
                    return `
                        .theme-elegant .cv-section-title {
                            border-bottom: 1px solid #999;
                            color: #333;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        }
                    `;
                case 'creative':
                    return `
                        .theme-creative .cv-section-title {
                            border-bottom: 3px double #FF5722;
                            color: #FF5722;
                        }
                    `;
                default:
                    return '';
            }
        }
    });
