import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOWNS, KEYWORDS_SUGGESTIONS } from '../../services/mockData';
import styles from './CampaignForm.module.scss';

const EMPTY_FORM = {
    name: '',
    keywords: [],
    bidAmount: '',
    campaignFund: '',
    status: 'on',
    town: '',
    radius: '',
};

function CampaignForm({ campaign, onClose }) {
    const { balance, addCampaign, updateCampaign } = useApp();
    const isEditing = Boolean(campaign);

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [keywordInput, setKeywordInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const keywordRef = useRef(null);

    useEffect(() => {
        if (campaign) {
            setForm({
                name: campaign.name,
                keywords: campaign.keywords,
                bidAmount: campaign.bidAmount,
                campaignFund: campaign.campaignFund,
                status: campaign.status,
                town: campaign.town || '',
                radius: campaign.radius,
            });
        }
    }, [campaign]);

    // Typeahead logic
    useEffect(() => {
        if (keywordInput.trim().length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const filtered = KEYWORDS_SUGGESTIONS.filter(
            (kw) =>
                kw.toLowerCase().includes(keywordInput.toLowerCase()) &&
                !form.keywords.includes(kw)
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [keywordInput, form.keywords]);

    // Close suggestions on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (keywordRef.current && !keywordRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addKeyword = (kw) => {
        const trimmed = kw.trim();
        if (!trimmed || form.keywords.includes(trimmed)) return;
        setForm((prev) => ({ ...prev, keywords: [...prev.keywords, trimmed] }));
        setKeywordInput('');
        setShowSuggestions(false);
    };

    const removeKeyword = (kw) => {
        setForm((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((k) => k !== kw),
        }));
    };

    const handleKeywordKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addKeyword(keywordInput);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Campaign name is required.';
        if (form.keywords.length === 0) newErrors.keywords = 'At least one keyword is required.';

        const bid = parseFloat(form.bidAmount);
        if (!form.bidAmount) newErrors.bidAmount = 'Bid amount is required.';
        else if (isNaN(bid) || bid <= 0) newErrors.bidAmount = 'Bid must be a positive number.';

        const fund = parseFloat(form.campaignFund);
        if (!form.campaignFund) newErrors.campaignFund = 'Campaign fund is required.';
        else if (isNaN(fund) || fund <= 0) newErrors.campaignFund = 'Fund must be a positive number.';
        else {
            const availableBalance = isEditing
                ? balance + campaign.campaignFund
                : balance;
            if (fund > availableBalance) {
                newErrors.campaignFund = `Insufficient balance. Available: $${availableBalance.toFixed(2)}`;
            }
        }

        if (!form.radius) newErrors.radius = 'Radius is required.';
        else if (isNaN(parseFloat(form.radius)) || parseFloat(form.radius) <= 0) {
            newErrors.radius = 'Radius must be a positive number.';
        }

        if (!form.status) newErrors.status = 'Status is required.';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            ...form,
            bidAmount: parseFloat(form.bidAmount),
            campaignFund: parseFloat(form.campaignFund),
            radius: parseFloat(form.radius),
        };

        if (isEditing) {
            updateCampaign(campaign.id, payload, campaign.campaignFund);
        } else {
            addCampaign(payload);
        }
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const availableBalance = isEditing ? balance + campaign.campaignFund : balance;

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Campaign Name */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                    Campaign Name <span className={styles.required}>*</span>
                </label>
                <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Summer Electronics Sale"
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            {/* Keywords */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="keyword-input">
                    Keywords <span className={styles.required}>*</span>
                </label>
                <div className={styles.keywordsWrapper} ref={keywordRef}>
                    <div className={`${styles.keywordsBox} ${errors.keywords ? styles.inputError : ''}`}>
                        {form.keywords.map((kw) => (
                            <span key={kw} className={styles.keywordTag}>
                                {kw}
                                <button
                                    type="button"
                                    onClick={() => removeKeyword(kw)}
                                    aria-label={`Remove ${kw}`}
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        <input
                            id="keyword-input"
                            className={styles.keywordInput}
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={handleKeywordKeyDown}
                            placeholder={form.keywords.length === 0 ? 'Type and press Enter...' : ''}
                        />
                    </div>
                    {showSuggestions && (
                        <ul className={styles.suggestions}>
                            {suggestions.map((s) => (
                                <li key={s} onClick={() => addKeyword(s)}>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {errors.keywords && <p className={styles.error}>{errors.keywords}</p>}
            </div>

            {/* Bid Amount*/}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="bidAmount">
                    Bid Amount ($) <span className={styles.required}>*</span>
                </label>
                <input
                    className={`${styles.input} ${errors.bidAmount ? styles.inputError : ''}`}
                    id="bidAmount"
                    name="bidAmount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.bidAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                />
                {errors.bidAmount && <p className={styles.error}>{errors.bidAmount}</p>}
            </div>

            {/* Campaign Fund */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="campaignFund">
                    Campaign Fund ($) <span className={styles.required}>*</span>
                </label>
                <input
                    className={`${styles.input} ${errors.campaignFund ? styles.inputError : ''}`}
                    id="campaignFund"
                    name="campaignFund"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.campaignFund}
                    onChange={handleChange}
                    placeholder="0.00"
                />
                <p className={styles.hint}>
                    Available balance: <strong>${availableBalance.toFixed(2)}</strong>
                </p>
                {errors.campaignFund && <p className={styles.error}>{errors.campaignFund}</p>}
            </div>

            {/* Town + Radius*/}
            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="town">
                        Town
                    </label>
                    <select
                        className={styles.input}
                        id="town"
                        name="town"
                        value={form.town}
                        onChange={handleChange}
                    >
                        <option value="">— Select town —</option>
                        {TOWNS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="radius">
                        Radius (km) <span className={styles.required}>*</span>
                    </label>
                    <input
                        className={`${styles.input} ${errors.radius ? styles.inputError : ''}`}
                        id="radius"
                        name="radius"
                        type="number"
                        min="1"
                        step="1"
                        value={form.radius}
                        onChange={handleChange}
                        placeholder="e.g. 25"
                    />
                    {errors.radius && <p className={styles.error}>{errors.radius}</p>}
                </div>
            </div>

            {/* Status */}
            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="status">
                        Status <span className={styles.required}>*</span>
                    </label>
                    <select
                        className={`${styles.input} ${errors.status ? styles.inputError : ''}`}
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="on">ON</option>
                        <option value="off">OFF</option>
                    </select>
                    {errors.status && <p className={styles.error}>{errors.status}</p>}
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button type="button" className={styles.btnCancel} onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className={styles.btnSubmit}>
                    {isEditing ? 'Save Changes' : 'Create Campaign'}
                </button>
            </div>
        </form>
    );
}

export default CampaignForm;