<!-- ESTRATEGIA 1: CAPTURA INMEDIATA -->
<script data-cookieconsent="ignore">
(function() {
    const url = window.location.href;
    const originalSearch = window.location.search;
    
    const extractParams = (url) => {
        const match = url.match(/[?&](gclid|wbraid|gbraid)=([^&#]*)/);
        return match ? { param: match[1], value: match[2] } : null;
    };
    
    const googleParam = extractParams(url);
    
    if (googleParam) {
        try {
            localStorage.setItem('google_tracking_original', googleParam.value);
            localStorage.setItem('google_tracking_param', googleParam.param);
            console.log(`Parámetro ${googleParam.param} capturado:`, googleParam.value);
        } catch (e) {
            document.cookie = `google_tracking=${googleParam.value}; path=/; max-age=7776000`;
        }
    }
})();
</script>

<!-- ESTRATEGIA 2: USANDO DOCUMENT.REFERRER -->
<script>
function captureFromReferrer() {
    const referrer = document.referrer;
    if (referrer && referrer.includes('google')) {
        const uniqueId = `goog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('google_tracking_ref', uniqueId);
        console.log('Tracking por referrer de Google:', uniqueId);
        return uniqueId;
    }
    return null;
}
</script>

<!-- ESTRATEGIA 3: SERVIDOR SIDE (PHP EJEMPLO) -->
<!--
<?php
session_start();
$gclid = $_GET['gclid'] ?? $_SESSION['gclid'] ?? null;
$wbraid = $_GET['wbraid'] ?? $_SESSION['wbraid'] ?? null;

if ($gclid) $_SESSION['gclid'] = $gclid;
if ($wbraid) $_SESSION['wbraid'] = $wbraid;

$tracking_value = $gclid ?: $wbraid;
?>

<script>
window.serverTracking = '<?php echo htmlspecialchars($tracking_value); ?>';
if (window.serverTracking) {
    localStorage.setItem('convertiam_gclid_tag', window.serverTracking);
}
</script>
-->

<!-- ESTRATEGIA 4: PARÁMETROS PERSONALIZADOS -->
<script>
function useCustomParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const customParams = [
        'campaign_id',
        'source_id',
        'click_id',
        'ref_id',
        'track_id'
    ];
    
    for (const param of customParams) {
        const value = urlParams.get(param);
        if (value) {
            localStorage.setItem('convertiam_gclid_tag', value);
            console.log(`Parámetro personalizado capturado (${param}):`, value);
            return value;
        }
    }
    return null;
}
</script>

<!-- ESTRATEGIA 5: HASH FRAGMENT -->
<script>
function captureFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const params = new URLSearchParams(hash);
        const gclid = params.get('gclid') || params.get('ref');
        
        if (gclid) {
            localStorage.setItem('convertiam_gclid_tag', gclid);
            console.log('GCLID desde hash:', gclid);
            return gclid;
        }
    }
    return null;
}
</script>

<!-- ESTRATEGIA 6: SCRIPT COMBINADO ROBUSTO -->
<script data-cookieconsent="ignore">
(function() {
    try {
        let trackingValue = null;
        const STORAGE_KEY = 'convertiam_gclid_tag';
        
        const urlMatch = window.location.href.match(/[?&](gclid|wbraid|gbraid|campaign_id|ref_id)=([^&#]*)/);
        if (urlMatch) {
            trackingValue = urlMatch[2];
            console.log(`Capturado de URL (${urlMatch[1]}):`, trackingValue);
        }
        
        if (!trackingValue) {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            trackingValue = hashParams.get('gclid') || hashParams.get('ref');
            if (trackingValue) console.log('Capturado desde hash:', trackingValue);
        }
        
        if (!trackingValue && window.serverTracking) {
            trackingValue = window.serverTracking;
            console.log('Capturado desde servidor:', trackingValue);
        }
        
        if (!trackingValue) {
            trackingValue = localStorage.getItem(STORAGE_KEY) || 
                           getCookie(STORAGE_KEY);
            if (trackingValue) console.log('Recuperado almacenado:', trackingValue);
        }
        
        if (trackingValue) {
            localStorage.setItem(STORAGE_KEY, trackingValue);
            
            const assignToFields = () => {
                const fields = document.querySelectorAll(`input[name="${STORAGE_KEY}"]`);
                fields.forEach(field => field.value = trackingValue);
                if (fields.length > 0) {
                    console.log(`Asignado a ${fields.length} campo(s):`, trackingValue);
                }
            };
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', assignToFields);
            } else {
                assignToFields();
            }
        }
        
    } catch (error) {
        console.error('Error en tracking anti-Brave:', error);
    }
    
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
})();
</script>


