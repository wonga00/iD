import { t } from '../util/locale';

function selfIntersectingWay(ent, graph) {
    if (ent.type !== 'way') {
        return false;
    }
    var ns = new Set(ent.nodes);
    return ns.size < ent.nodes.length;
}

export function validationSelfIntersecting() {
    var validation = function(changes, graph) {
        var issues = [];

        function fn(c) {
            if (selfIntersectingWay(c, graph)) {
                issues.push({
                    id: 'self_intersecting',
                    // message: t('validations.self_intersecting'),
                    message: 'self_intersecting',
                    // tooltip: t('validations.self_intersecting'),
                    tooltip: 'self_intersecting',
                    entity: c
                    // ideally we store where it self intersects
                });
            }
        }

        changes.created.forEach(fn);
        changes.modified.forEach(fn);

        return issues;
    };

    return validation;
}
