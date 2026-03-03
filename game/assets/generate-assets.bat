@echo off
echo Generating Master Keeper Realm SVG assets...

:: Create directories
if not exist "assets\images\status-icons" mkdir assets\images\status-icons

:: Generate background placeholder
(
    echo # MASTER KEEPER REALM BACKGROUND
    echo # Resolution: 1920x1080
    echo # Format: JPG
    echo # Theme: Dark fantasy mining realm
) > assets\images\background.jpg

:: Generate keeper avatar
(
    echo ^<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"^>
    echo   ^<circle cx="256" cy="256" r="250" fill="#0f172a" /^>
    echo   ^<path d="M256,50 C180,100 150,200 256,250 L256,500 C360,450 380,250 256,250 Z" fill="#1e40af" /^>
    echo   ^<path d="M256,100 C200,150 180,250 256,300 L256,450 C310,400 320,300 256,250 Z" fill="#1d4ed8" opacity="0.8" /^>
    echo   ^<circle cx="256" cy="350" r="40" fill="none" stroke="#3b82f6" stroke-width="4" /^>
    echo   ^<circle cx="256" cy="350" r="20" fill="#60a5fa" /^>
    echo   ^<circle cx="256" cy="350" r="10" fill="#93c5fd" /^>
    echo   ^<circle cx="256" cy="350" r="5" fill="#dbeafe" /^>
    echo   ^<path d="M256,350 L280,320" stroke="#3b82f6" stroke-width="2" /^>
    echo   ^<path d="M256,350 L230,330" stroke="#3b82f6" stroke-width="2" /^>
    echo   ^<path d="M256,350 L260,380" stroke="#3b82f6" stroke-width="2" /^>
    echo   ^<path d="M256,350 L225,365" stroke="#3b82f6" stroke-width="2" /^>
    echo ^</svg^>
) > assets\images\keeper.svg

:: Generate worker mining visual
(
    echo ^<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"^>
    echo   ^<circle cx="128" cy="128" r="120" fill="#1e293b" /^>
    echo   ^<rect x="70" y="80" width="116" height="96" rx="10" fill="#1d4ed8" /^>
    echo   ^<circle cx="128" cy="128" r="100" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.3" /^>
    echo   ^<circle cx="128" cy="128" r="80" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.2" /^>
    echo   ^<circle cx="128" cy="128" r="60" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.1" /^>
    echo   ^<path d="M100,110 L90,130 L110,130 Z" fill="#60a5fa" /^>
    echo   ^<path d="M120,100 L110,120 L130,120 Z" fill="#60a5fa" /^>
    echo   ^<path d="M140,110 L130,130 L150,130 Z" fill="#60a5fa" /^>
    echo   ^<path d="M100,140 L90,160 L110,160 Z" fill="#60a5fa" /^>
    echo   ^<path d="M120,130 L110,150 L130,150 Z" fill="#60a5fa" /^>
    echo   ^<path d="M140,140 L130,160 L150,160 Z" fill="#60a5fa" /^>
    echo   ^<circle cx="128" cy="128" r="5" fill="#93c5fd" opacity="0.8" /^>
    echo   ^<circle cx="128" cy="128" r="10" fill="none" stroke="#93c5fd" stroke-width="1" opacity="0.5" /^>
    echo   ^<circle cx="128" cy="128" r="15" fill="none" stroke="#93c5fd" stroke-width="1" opacity="0.3" /^>
    echo ^</svg^>
) > assets\images\worker-mining.svg

:: Generate worker idle visual
(
    echo ^<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"^>
    echo   ^<circle cx="128" cy="128" r="120" fill="#1e293b" /^>
    echo   ^<rect x="70" y="80" width="116" height="96" rx="10" fill="#334155" opacity="0.7" /^>
    echo   ^<circle cx="128" cy="128" r="100" fill="none" stroke="#475569" stroke-width="2" opacity="0.2" /^>
    echo   ^<circle cx="128" cy="128" r="40" fill="#475569" opacity="0.5" /^>
    echo   ^<path d="M100,110 L90,130 L110,130 Z" fill="#64748b" opacity="0.5" /^>
    echo   ^<path d="M120,100 L110,120 L130,120 Z" fill="#64748b" opacity="0.5" /^>
    echo   ^<path d="M140,110 L130,130 L150,130 Z" fill="#64748b" opacity="0.5" /^>
    echo   ^<circle cx="128" cy="128" r="15" fill="none" stroke="#94a3b8" stroke-width="2" /^>
    echo   ^<line x1="120" y1="120" x2="136" y2="136" stroke="#94a3b8" stroke-width="2" /^>
    echo ^</svg^>
) > assets\images\worker-idle.svg

:: Generate status icons
(
    echo ^<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"^>
    echo   ^<circle cx="24" cy="24" r="20" fill="#10b981" /^>
    echo   ^<circle cx="24" cy="24" r="15" fill="white" opacity="0.2" /^>
    echo   ^<circle cx="24" cy="24" r="8" fill="white" />
    echo ^</svg^>
) > assets\images\status-icons\online.svg

(
    echo ^<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"^>
    echo   ^<circle cx="24" cy="24" r="20" fill="#f59e0b" /^>
    echo   ^<circle cx="24" cy="24" r="15" fill="white" opacity="0.2" /^>
    echo   ^<path d="M20,16 L28,24 L20,32" stroke="white" stroke-width="3" fill="none" /^>
    echo ^</svg^>
) > assets\images\status-icons\unstable.svg

(
    echo ^<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"^>
    echo   ^<circle cx="24" cy="24" r="20" fill="#ef4444" /^>
    echo   ^<circle cx="24" cy="24" r="15" fill="white" opacity="0.2" /^>
    echo   ^<line x1="16" y1="16" x2="32" y2="32" stroke="white" stroke-width="3" /^>
    echo   ^<line x1="16" y1="32" x2="32" y2="16" stroke="white" stroke-width="3" />
    echo ^</svg^>
) > assets\images\status-icons\dead.svg

:: Create sound placeholders
(
    echo # MINING SOUND EFFECT
    echo # Format: WAV
    echo # Duration: 12 seconds
    echo # Theme: Ambient mining sounds
) > assets\sounds\mining.wav

(
    echo # ALERT SOUND EFFECT
    echo # Format: WAV
    echo # Duration: 2.5 seconds
    echo # Theme: Clear alert tone
) > assets\sounds\alert.wav

echo Assets generated successfully!
echo You can now convert SVG files to PNG using your preferred tool.
pause
